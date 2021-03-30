 <template>
  <el-table :data="deviceList" style="width: 100%">
    <el-table-column prop="poolName" label="poolName" width="180"> </el-table-column>
    <el-table-column prop="hostName" label="hostName" width="180"> </el-table-column>
    <el-table-column prop="nickname" label="nickname"> </el-table-column>
    <el-table-column prop="status" label="status"> </el-table-column>
    <el-table-column prop="updatedOn" label="updatedOn"> </el-table-column>
    <el-table-column prop="description" label="description"> </el-table-column>
  </el-table>
</template>

<script>

import botExecutionOrchestrator from "@/api/v2/botExecutionOrchestrator.js";

export default {
  data() {
    return {
      deviceList: [],
    };
  },

  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getAllDevice()
  },
  methods: {
    getAllDevice(){
      botExecutionOrchestrator.devicesList().then(response =>{
          debugger
        this.deviceList = response.list
      })
      .catch((error) =>{
        console.log(error);
      })
    },
  },
};
</script>