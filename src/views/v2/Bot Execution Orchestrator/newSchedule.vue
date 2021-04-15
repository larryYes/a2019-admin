<template>
  <div>
    <el-row :gutter="10" type="flex">
      <el-col>
        <h2>计划机器人</h2>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="onSubmit">update</el-button>
      </el-col>
    </el-row>

    <div>
      <el-radio v-model="isRepeat" :label="true">重复运行</el-radio>
      <el-radio v-model="isRepeat" :label="false">只运行一次</el-radio>
      <el-form :model="body" class="run-repeated" v-if="isRepeat">
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="body.startDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="body.endDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-time-picker
            v-model="body.startTime"
            :picker-options="{
            selectableRange: ''
             }"
            placeholder="任意时间点"
            format="HH:mm"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <h4>选择运行频率</h4>
        <div>
          <el-radio v-model="body.scheduleType" label="DAILY">按日选择</el-radio>
          <div v-if="body.scheduleType=='DAILY'">
            <p>选择每次运行间隔天数</p>
            <el-input-number
              v-model="body.dailyRecurrence.interval"
              :min="1"
              :max="10"
              controls-position="right"
              size="small"
            ></el-input-number>
          </div>
        </div>
        <div>
          <el-radio v-model="body.scheduleType" label="WEEKLY">按周选择</el-radio>
          <div v-if="body.scheduleType=='WEEKLY'">
            <p>选择每次运行间隔周数</p>
            <el-input-number
              v-model="body.weeklyRecurrence.interval"
              :min="1"
              :max="10"
              controls-position="right"
              size="small"
            ></el-input-number>
            <p>选择具体时间</p>
            <el-checkbox-group v-model="body.weeklyRecurrence.daysOfWeek">
              <el-checkbox label="MON">Monday</el-checkbox>
              <el-checkbox label="TUE">Tuesday</el-checkbox>
              <el-checkbox label="WED">Wednesday</el-checkbox>
              <el-checkbox label="THU">Thursday</el-checkbox>
              <el-checkbox label="FRI">Friday</el-checkbox>
              <el-checkbox label="SAT">Saturday</el-checkbox>
              <el-checkbox label="SUN">Sunday</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <el-radio v-model="body.scheduleType" label="MONTHLY">按月选择</el-radio>
          <div v-if="body.scheduleType=='MONTHLY'">
            <p>选择每个月的具体日期</p>
            <el-input-number
              v-model="body.monthlyDateRecurrence.dateOfMonth"
              :min="1"
              :max="31"
              controls-position="right"
              size="small"
            ></el-input-number>
            <el-checkbox-group v-model="body.monthlyDateRecurrence.monthsOfYear">
              <div>
                <el-checkbox label="JAN">January</el-checkbox>
                <el-checkbox label="FEB">February</el-checkbox>
                <el-checkbox label="MAR">March</el-checkbox>
                <el-checkbox label="APR">April</el-checkbox>
                <el-checkbox label="MAY">May</el-checkbox>
                <el-checkbox label="JUN">June</el-checkbox>
              </div>
              <div>
                <el-checkbox label="JUL">July</el-checkbox>
                <el-checkbox label="AUG">August</el-checkbox>
                <el-checkbox label="SEP">September</el-checkbox>
                <el-checkbox label="OCT">October</el-checkbox>
                <el-checkbox label="NOV">November</el-checkbox>
                <el-checkbox label="DEC">December</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>
        <el-form-item label></el-form-item>
      </el-form>
      <el-form :model="body" class="run-once" v-else>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="body.startDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-time-picker
            v-model="body.startTime"
            :picker-options="{
            selectableRange: ''
            
             }"
            placeholder="任意时间点"
            format="HH:mm"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-form ref="body" :model="body" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="BOT">
                <el-select
                  v-model="body.fileId"
                  filterable
                  placeholder="请选择BOT"
                  @change="getVariables"
                >
                  <el-option v-for="bot in botList" :key="bot.id" :label="bot.name" :value="bot.id">
                    <span style="float: left">{{ bot.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 10px">
                      {{
                      bot.path
                      }}
                    </span>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="项目名称">
                <el-input v-model="body.name" placeholder="必填"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="设备池">
                <el-select v-model="body.poolIds[0]" placeholder="选填">
                  <el-option
                    v-for="pool in poolList"
                    :key="pool.id"
                    :label="pool.name"
                    :value="pool.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="覆盖默认设备">
                <el-switch v-model="body.overrideDefaultDevice"></el-switch>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="Runner用户">
                <el-select v-model="body.runAsUserIds[0]" placeholder="请选择用户">
                  <el-option
                    v-for="runner in runnerList"
                    :key="runner.id"
                    :label="runner.username"
                    :value="runner.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <vue-json-editor v-model="body.botInput" :mode="'code'" lang="zh"></vue-json-editor>
            </div>
            <el-button round v-on:click="reset()" type="warning" size="small">清空</el-button>
          </el-col>
        </el-row>-->

        <!-- <el-form-item label="返回参数">
      <el-input autosize type="textarea" v-model="respData"></el-input>
        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import automations from "@/api/v1/automations";
import vueJsonEditor from "vue-json-editor";
import usermanagement from "@/api/v1/usermanagement.js";
import pools from "@/api/v2/pools.js";
import repository from "@/api/v2/repository.js";
import common from "@/api/v1/common.js";

export default {
  data() {
    return {
      respData: undefined,
      runnerList: [],
      poolList: [],
      botList: [],
      variables: [],
      id: "",
      isRepeat: false,
      botname: "",
      body: {
        // id: "",
        // name: "",
        // status: "",
        // description: "",
        // rdpEnabled: true,
        scheduleType: "DAILY",
        dailyRecurrence: {
          interval: 0,
        },
        weeklyRecurrence: {
          interval: 0,
          daysOfWeek: [],
        },
        monthlyDateRecurrence: {
          monthsOfYear: [],
          dateOfMonth: 0,
        },
        monthlyWeekDayRecurrence: {
          monthsOfYear: [""],
          weekOfMonth: "",
          dayOfWeek: "",
        },
        startDate: "",
        endDate: "",
        startTime: "",
        repeatEnabled: false,
        automationName: undefined,
        botInput: {},
        fileId: undefined,
        runAsUserIds: [],
        poolIds: [],
        overrideDefaultDevice: false,
        timeZone: "Asia/Shanghai",
        status: "ACTIVE",
        name: "",
        // repeat_occurrence: {
        //   run_every: "",
        //   timeUnit: "",
        //   end_time: "",
        // },
        // zoned_next_run_date_time: "",
        // created_by: "",
        // created_on: "",
        // updated_by: "",
        // updated_on: "",
        // tenant_id: "",
        // file_name: "",
        // file_path: "",
        // run_as_user_ids: [""],
      },
    };
  },
  created() {
    this.body = Object.assign(this.body, this.$route.query);
    console.log(this.body);
    this.getRunnerList(); // 初始化runner用户
    this.getPoolList(); // 初始化pool
    this.getBotList(); // 初始化bot
    // this.body = this.$route.query;
    // console.log(this.body);
  },
  methods: {
    onSubmit() {
      this.autoNaming();
      this.bodyChange();
      automations
        .newSchedules(this.body)
        .then(this.$router.go(-1))
        .catch((error) => {
          console.log(error);
        });
    },
    bodyChange() {
      if (this.isRepeat) {
        if (this.body.scheduleType == "DAILY") {
          delete this.body.weeklyRecurrence;
          delete this.body.monthlyDateRecurrence;
          delete this.body.monthlyWeekDayRecurrence;
        }
        if (this.body.scheduleType == "WEEKLY") {
          delete this.body.dailyRecurrence;
          delete this.body.monthlyDateRecurrence;
          delete this.body.monthlyWeekDayRecurrence;
        }
        if (this.body.scheduleType == "MONTHLY") {
          delete this.body.weeklyRecurrence;
          delete this.body.dailyRecurrence;

          delete this.body.monthlyWeekDayRecurrence;
        }
      } else {
        this.body.scheduleType = "NONE";
        delete this.body.dailyRecurrence;
        delete this.body.weeklyRecurrence;
        delete this.body.monthlyDateRecurrence;
        delete this.body.monthlyWeekDayRecurrence;
      }
    },
    reset() {
      this.body.botInput = {};
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
          this.body.botInput = [...input.entries()].reduce(
            (obj, [key, value]) => ((obj[key] = value), obj),
            {}
          );
          console.info(this.body);
        })
        .catch((error) => {
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
    autoNaming() {
      this.body.automationName =
        this.body.startDate + "." + this.body.startTime;
    },
  },
};
</script>