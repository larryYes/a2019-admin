<template>
  <el-form ref="deployData" :model="deployData" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-form-item label="BOT">
            <el-select
              v-model="deployData.fileId"
              filterable
              placeholder="请选择BOT"
              @change="getVariables"
            >
              <el-option
                v-for="bot in botList"
                :key="bot.id"
                :label="bot.name"
                :value="bot.id"
              >
                <span style="float: left">{{ bot.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 10px">{{
                  bot.path
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-form-item label="项目名称">
            <el-input
              v-model="deployData.automationName"
              placeholder="选填"
            ></el-input>
          </el-form-item></div
      ></el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-form-item label="设备池">
            <el-select v-model="deployData.poolIds[0]" placeholder="选填">
              <el-option
                v-for="pool in poolList"
                :key="pool.id"
                :label="pool.name"
                :value="pool.id"
              ></el-option>
            </el-select>
          </el-form-item></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-form-item label="覆盖默认设备">
            <el-switch v-model="deployData.overrideDefaultDevice"></el-switch>
          </el-form-item></div
      ></el-col>
    </el-row>

    <el-row>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-form-item label="Runner用户">
            <el-select
              v-model="deployData.runAsUserIds[0]"
              placeholder="请选择用户"
            >
              <el-option
                v-for="runner in runnerList"
                :key="runner.id"
                :label="runner.username"
                :value="runner.id"
              ></el-option>
            </el-select>
          </el-form-item></div
      ></el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即部署</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8"
        ><div class="grid-content bg-purple-dark">
          <vue-json-editor
            v-model="deployData.botInput"
            :mode="'code'"
            lang="zh"
          >
          </vue-json-editor>
        </div>
        <el-button round v-on:click="reset()" type="warning" size="small"
          >清空</el-button
        >
      </el-col>
    </el-row>

    <!-- <el-form-item label="返回参数">
      <el-input autosize type="textarea" v-model="respData"></el-input>
    </el-form-item> -->
  </el-form>
</template>


<script>
import vueJsonEditor from "vue-json-editor";
import deploy from "@/api/v3/deploy.js";
import usermanagement from "@/api/v1/usermanagement.js";
import pools from "@/api/v2/pools.js";
import repository from "@/api/v2/repository.js";
import common from "@/api/v1/common.js";

export default {
  data() {
    return {
      deployData: {
        automationName: undefined,
        botInput: {},
        fileId: undefined,
        runAsUserIds: [],
        poolIds: [],
        overrideDefaultDevice: false,
      },
      respData: undefined,
      runnerList: [],
      poolList: [],
      botList: [],
      variables: [],
    };
  },
  components: {
    vueJsonEditor,
  },

  created() {
    console.log("deploy created");
    this.getRunnerList(); // 初始化runner用户
    this.getPoolList(); // 初始化pool
    this.getBotList(); // 初始化bot
  },
  mounted() {
    // console.log("test0");
    // console.log(this.deployData.botInput.keys);
    // console.log("test1");
    // console.log(this.varia);
  },

  methods: {
    reset() {
      this.deployData.botInput = {};
    },
    getVariables(id) {
      common
        .getBotVariables(id)
        .then((response) => {
          this.variables = response.variables;
          // 构建botinput入参格式
          var input = new Map();
          for (let index = 0; index < this.variables.length; index++) {
            var vName = this.variables[index].name;
            if (vName !== "prompt-assignment") {
              var vType = this.variables[index].type;
              input.set(vName, {
                type: vType,
                [vType]: "变量值",
              });
            }
          }
          this.deployData.botInput = [...input.entries()].reduce(
            (obj, [key, value]) => ((obj[key] = value), obj),
            {}
          );
          console.info(this.deployData);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onSubmit() {
      console.log(this.deployData);

      deploy
        .deployBot(this.deployData)
        .then((response) => {
          this.respData = response.deploymentId;
          this.$router.push({ path: "/activity/inprogress" });
        })
        .catch((error) => {
          this.respData = error.message;
          console.log(respData);
        });
    },
    getRunnerList() {
      usermanagement
        .getRunnerUsers()
        .then((response) => {
          this.runnerList = response.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPoolList() {
      pools
        .getAllPools()
        .then((response) => {
          this.poolList = response.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getBotList() {
      repository
        .getAllPublicBots()
        .then((response) => {
          this.botList = response.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
