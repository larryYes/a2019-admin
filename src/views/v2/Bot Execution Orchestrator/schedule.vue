<template>
  <div>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="getAllSchedule()">刷新</el-button>
      <el-button type="primary" @click="activateSchedule()">激活</el-button>
      <el-button type="primary" @click="deactivateSchedule()">停用</el-button>
      <el-button type="danger" @click="deleteSchedule()">删除</el-button>
      
    </div>
    <el-table
      ref="multipleTable"
      :data="scheduleList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="zonedNextRunDateTime" label="下一次发生时间" width="200"></el-table-column>
      <el-table-column prop="name" label="活动名称" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
      <el-table-column prop="fileName" label="机器人名称" width="100"></el-table-column>
    </el-table>
  </div>
</template>


<script>
import automations from "@/api/v1/automations";
// import common from "@/api/v1/common";

export default {
  data() {
    return {
      scheduleList: [],
      number: 0,
      body: {},
      multipleSelection: [],
    };
  },
  created() {
    this.getAllSchedule();
  },
  methods: {
    //获取schedule列表
    getAllSchedule() {
      automations
        .getAllSchedules(this.body)
        .then((response) => {
          this.scheduleList = response.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //激活选中的schedule
    activateSchedule() {
      if (this.multipleSelection.length == 0) {
        alert("未选择项目");
        return;
      }
      let selectedList = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        selectedList.push(this.multipleSelection[i].id);
      }
      automations
        .activateSchedules(selectedList)
        .then((response) => {
          this.getAllSchedule();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //停用选中的schedule
    deactivateSchedule() {
      if (this.multipleSelection.length == 0) {
        alert("未选择项目");
        return;
      }
      let selectedList = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        selectedList.push(this.multipleSelection[i].id);
      }
      automations
        .deactivateSchedules(selectedList)
        .then((response) => {
          this.getAllSchedule();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //删除选中的schedule
    deleteSchedule() {
      if (this.multipleSelection.length == 0) {
        alert("未选择项目");
        return;
      }
      let selectedIDs = "";
      for (let i = 0; i < this.multipleSelection.length; i++) {
        selectedIDs = selectedIDs + this.multipleSelection[i].id + "%2C";
      }
      selectedIDs = selectedIDs.slice(0,-3)
      automations
        .deleteSchedules(selectedIDs)
        .then((response) => {
          this.getAllSchedule();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //选择框方法，将选取行的数据存入multipleSelection中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
  },
  mounted() {
    //3秒刷新一次数据
    setInterval(() => {
      this.number = this.number + 1;
    }, 3000);
  },
  watch: {
    number() {
      //   this.getAllSchedules()
    },
  },
};
</script>