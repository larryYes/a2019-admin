<template>
  <el-table :data="scheduleList" style="width: 100%">
    <!-- <el-table-column prop="status" label="类型" width="180"></el-table-column> -->
    <el-table-column prop="name" label="活动名称" width="180"></el-table-column>
    <el-table-column prop="zonedNextRunDateTime" label="下一次发生" width="200"></el-table-column>
    <el-table-column prop="fileName" label="bot名称" width="100"></el-table-column>
    <!-- <el-table-column label="操作" width="120"> -->
    <!-- <template slot-scope="scope">
        <el-button @click.prevent="skipDetailPage(scope.row.id)" type="text" size="small">项目详情</el-button>
      </template>
    </el-table-column>-->
  </el-table>
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
    };
  },
  created() {
    this.getAllSchedule();
  },
  methods: {
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
    // skipDetailPage(id) {
    //   this.$router.push({
    //     path: `/activity/inProgress/${id}/detail`,
    //     query: { param: this.param },
    //   });
    // },
  },
  mounted() {
    //3秒刷新一次数据
    setInterval(() => {
      this.number = this.number + 1;
    }, 3000)
  },
  watch: {
    number() {
      //   this.getAllSchedules()
    },
  },
};
</script>