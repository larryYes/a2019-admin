<template>
  <el-table :data="inprogressList" style="width: 100%">
    <el-table-column prop="automationName" label="名称" width="180" ></el-table-column>
    <el-table-column prop="startDateTime" label="起始时间" width="180"></el-table-column>
    <el-table-column prop="command" label="描述" width="100"></el-table-column>
    <el-table-column
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.prevent="skipDetailPage(scope.row.id)"
          type="text"
          size="small">
          项目详情
        </el-button>
      </template>
      
    </el-table-column>
    
  </el-table>
</template>

<script>
import botExcecutionOrchestrator from "@/api/v2/botExecutionOrchestrator.js";
import common from '@/api/v1/common'

export default {
  data() {
    return {
      inprogressList: [],
    };
  },
  created() {
    this.getAllInprogressBot();
  },
  methods: {
    getAllInprogressBot() {
      common
        .getInProgressActivity()
        .then((response) => {
          this.inprogressList = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    skipDetailPage(id){
        this.$router.push({
            path: `/activity/inProgress/${id}/detail`,
            query: {param: this.param}
        })
    }
  },
};
</script>