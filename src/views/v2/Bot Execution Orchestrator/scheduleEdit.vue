<template>
  <div>
    <div>
      <el-radio v-model="isRepeat" :label="true">重复运行</el-radio>
      <el-radio v-model="isRepeat" :label="false">只运行一次</el-radio>
      <el-form :model="body" class="run-repeated" v-if="isRepeat">
        <el-form-item label="开始日期">
          <el-date-picker v-model="body.startDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker v-model="body.endDate" type="date" placeholder="选择日期"></el-date-picker>
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">update</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="body" class="run-once" v-else>
        <el-form-item label="开始日期">
          <el-date-picker v-model="body.startDate" type="date" placeholder="选择日期"></el-date-picker>
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

        <el-form-item>
          <el-button type="primary" @click="onSubmit">update</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import automations from "@/api/v1/automations";
export default {
  data() {
    return {
      id: "",
      isRepeat:false,
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
    // this.body = this.$route.query;
    // console.log(this.body);
  },
  methods: {
    onSubmit() {
        this.bodyChange()
      automations
        .updateSchedules(this.body)
        .then(this.backToScheduleList())
        .catch((error) => {
          console.log(error);
        });
    },
    bodyChange(){
        if(this.body.repeatEnabled){
            if(scheduleTyp=='DAILY'){
                 delete this.body.weeklyRecurrence
            delete this.body.monthlyDateRecurrence
            delete this.body.monthlyWeekDayRecurrence
            }
        }
        else{
            delete this.body.scheduleType
            delete this.body.dailyRecurrence
            delete this.body.weeklyRecurrence
            delete this.body.monthlyDateRecurrence
            delete this.body.monthlyWeekDayRecurrence
        }
    },
    backToScheduleList(){
        this.$router.push({
            path: `/activity/schedule`
        })
    },
  },
};
</script>