<template>
  <el-table :data="inprogressList" style="width: 100%">
    <el-table-column prop="automationName" label="名称" width="180"></el-table-column>
    <el-table-column prop="startDateTime" label="起始时间" width="180"></el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
  </el-table>
</template>

<script>
import botExcecutionOrchestrator from "@/api/v2/botExecutionOrchestrator.js";
export default {
  data() {
    return {
      inprogressList: [],
      body: {
        fields: ["status"],
        filter: {
          operator: "or",
          operands: [
            // {
            //     "operator": "eq",
            //     "field": "status",
            //     "value": "QUEUED"
            // }
            // ,
            {
              operator: "eq",
              field: "status",
              value: "RUN_FAILED",
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
  },
};
</script>