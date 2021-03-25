<template>
  <el-form ref="deployData" :model="deployData" label-width="150px">
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
      <ul>
        <li v-for="(variable,index) in variables" v-bind:key="index">
          <el-input placeholder="请输入变量值">
            <template slot="append">{{ variable.type }}</template>
            <template slot="prepend">{{ variable.name }}</template>
          </el-input>
        </li>
      </ul>
    </el-form-item>

    <el-form-item label="项目名称">
      <el-input
        v-model="deployData.automationName"
        placeholder="选填"
      ></el-input>
    </el-form-item>
    <el-form-item label="Runner用户">
      <el-select v-model="deployData.runAsUserIds[0]" placeholder="请选择用户">
        <el-option
          v-for="runner in runnerList"
          :key="runner.id"
          :label="runner.username"
          :value="runner.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备池">
      <el-select v-model="deployData.poolIds[0]" placeholder="选填">
        <el-option
          v-for="pool in poolList"
          :key="pool.id"
          :label="pool.name"
          :value="pool.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否覆盖默认设备">
      <el-switch v-model="deployData.overrideDefaultDevice"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即部署</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    <el-form-item label="返回参数">
      <el-input autosize type="textarea" v-model="respData"></el-input>
    </el-form-item>
  </el-form>
</template>


<script>
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
        fileId: undefined,
        runAsUserIds: [],
        poolIds: [],
        overrideDefaultDevice: false,
        botInput: {
          "": {
            type: "",
            number: "",
          }
        },
      },
      respData: undefined,
      runnerList: [],
      poolList: [],
      botList: [],
      variables: [],
    };
  },
  created() {
    console.log("deploy created");
    this.getRunnerList(); // 初始化runner用户
    this.getPoolList(); // 初始化pool
    this.getBotList(); // 初始化bot
  },
  mounted(){
   console.log(this.deployData.botInput) 
   console.log('test0')
   console.log(this.deployData.botInput.keys) 
   console.log('test1')
   console.log(this.deployData.botInput) 
  },

  methods: {
    onSubmit() {
      console.log(this.deployData);
      deploy
        .deployBot(this.deployData)
        .then((response) => {
          debugger;
          this.respData = response.deploymentId;
        })
        .catch((error) => {
          this.respData = error.message;
          console.log(error);
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

    getVariables(id) {
      common
        .getBotVariables(id)
        .then((response) => {
          this.variables = response.variables;
        })
        .catch((error) => {
          console.log(error);
        });
    },


  },
};
</script>