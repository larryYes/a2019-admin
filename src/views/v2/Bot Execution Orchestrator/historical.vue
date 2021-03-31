<template>
  <el-table :data="progressList" style="width: 100%">
    <el-table-column prop="jobExecutionStatus" label="状态" width="150"></el-table-column>
    <el-table-column prop="automationName" label="项目名称" width="130"></el-table-column>
    <el-table-column prop="modifiedOn" label="修改时间" width="180"></el-table-column>
    <el-table-column prop="deviceName" label="设备名称" width="130"></el-table-column>
    <el-table-column label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.prevent="skipDetailPage(scope.row.id)" type="text" size="small">项目详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import botExcecutionOrchestrator from "@/api/v2/botExecutionOrchestrator.js";
import common from "@/api/v1/common";

export default {
  data() {
    return {
      progressList: [],
      number: 0,
      body: {
        sort: [
          {
            field: "modifiedOn",
            direction: "desc",
          },
        ],
        filter: {},
        fields: [],
        page: {
          offset: 0,
          length: 20,
        },
      },
    };
  },
  created() {
    this.getAllHistoricalBot();
  },
  methods: {
    getAllHistoricalBot() {
      common
        .getHistoryActivity(this.body)
        .then((response) => {
          this.progressList = response.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //点击跳转项目详情
    skipDetailPage(id) {
      this.$router.push({
        path: `/activity/historical/${id}/detail`,
        query: { param: this.param },
      });
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
      //   this.getAllHistoricalBot()
    },
  },
};
</script>