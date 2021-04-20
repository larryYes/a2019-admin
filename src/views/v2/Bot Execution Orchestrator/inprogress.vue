<template>
  <el-container>
    <el-header>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="getAllInprogressBot()">刷新</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="inprogressList" style="width: 100%" border="">
        <el-table-column prop="status" label="状态" width="180"></el-table-column>
        <el-table-column prop="automationName" label="项目名称" width="180"></el-table-column>
        <el-table-column prop="command" label="描述" width="200"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.prevent="skipDetailPage(scope.row.id)" type="text" size="small">项目详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import botExcecutionOrchestrator from "@/api/v2/botExecutionOrchestrator.js";

export default {
  data() {
    return {
      inprogressList: [],
      number: 0,
      body: {
        filter: {
          operator: "or",
          operands: [
            {
              operator: "eq",
              field: "status",
              value: "QUEUED",
            },
            {
              operator: "and",
              operands: [
                {
                  operator: "eq",
                  field: "status",
                  value: "UPDATE",
                },
                {
                  operator: "ne",
                  field: "totalLines",
                  value: 1,
                },
              ],
            },
          ],
        },
        sort: [
          {
            field: "modifiedOn",
            direction: "desc",
          },
        ],
        page: {
          offset: 0, //第几页
          length: 0, // 每页记录数
        },
      },
    };
  },
  created() {
    this.getAllInprogressBot();
  },
  methods: {
    getAllInprogressBot() {
      botExcecutionOrchestrator
        .botExecutions(this.body)
        .then((response) => {
          this.inprogressList = response.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    skipDetailPage(id) {
      this.$router.push({
        path: `/activity/inProgress/${id}/detail`,
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
      this.getAllInprogressBot();
    },
  },
};
</script>