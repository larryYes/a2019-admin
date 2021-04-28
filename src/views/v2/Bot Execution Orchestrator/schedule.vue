<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" @click="getAllSchedule()">刷新</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="activateSchedule">激活</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="deactivateSchedule()">停用</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="deleteSchedule()">删除</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="newSchedule()">新增计划</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        border
        v-loading="loading"
        ref="multipleTable"
        :data="scheduleList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="下一次发生时间" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.zonedNextRunDateTime">{{scope.row.zonedNextRunDateTime |sctTime}}</span>
            <span v-else>不适用</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称" width="200"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="fileName" label="机器人名称" width="120"></el-table-column>
        <el-table-column label="更多操作" width="100">
          <template slot-scope="scope">
            <el-button @click.prevent="skipEditPage(scope.row)" type="text" size="small">编辑计划</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
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
      loading: true,
    };
  },
  created() {
    this.loading = true;
    this.getAllSchedule();
  },
  methods: {
    //获取schedule列表
    getAllSchedule() {
      this.loading = true;
      automations
        .getAllSchedules(this.body)
        .then((response) => {
          this.scheduleList = response.list;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    //激活选中的schedule
    activateSchedule(event) {
      
      if (this.multipleSelection.length == 0) {
        alert("未选择项目");
        return;
      }
      this.loading = true;
      let selectedList = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        selectedList.push(this.multipleSelection[i].id);
      }
      automations
        .activateSchedules(selectedList)
        .then((response) => {
          this.getAllSchedule();
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
      let target = event.target;
      if (target.nodeName == "SPAN") {
        target = event.target.parentNode;
        
        target.blur();
      }
    },
    //停用选中的schedule
    deactivateSchedule() {
      if (this.multipleSelection.length == 0) {
        alert("未选择项目");
        return;
      }
      this.loading = true;
      let selectedList = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        selectedList.push(this.multipleSelection[i].id);
      }
      automations
        .deactivateSchedules(selectedList)
        .then((response) => {
          this.getAllSchedule();
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    //删除选中的schedule
    deleteSchedule() {
      if (this.multipleSelection.length == 0) {
        alert("未选择项目");
        return;
      }
      this.loading = true;
      let selectedIDs = "";
      for (let i = 0; i < this.multipleSelection.length; i++) {
        selectedIDs = selectedIDs + this.multipleSelection[i].id + "%2C";
      }
      selectedIDs = selectedIDs.slice(0, -3);
      automations
        .deleteSchedules(selectedIDs)
        .then((response) => {
          this.getAllSchedule();
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    //选择框方法，将选取行的数据存入multipleSelection中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //点击进入编辑页面
    skipEditPage(row) {
      this.$router.push({
        path: `/activity/schedule/${row.id}/edit`,
        query: row,
      });
      // console.log(row)
    },
    newSchedule() {
      this.$router.push({
        path: `/activity/schedule/new`,
      });
    },
  },
  filters: {
    sctTime(timeData) {
      let d = new Date(timeData);
      let localTime = d.toString().slice(16, 24);
      let localDate = d.toLocaleDateString();
      return localTime + " CST " + localDate;
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
      // this.getAllSchedule()
    },
  },
};
</script>