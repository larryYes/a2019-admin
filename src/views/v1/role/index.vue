<template>
  <el-table :data="roleList" style="width: 100%">
    <el-table-column prop="id" label="id" width="100"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="description" label="描述" width="300"></el-table-column>
    <el-table-column prop="countPrincipals" label="countPrincipals" width="300"></el-table-column>
    <el-table-column prop="version" label="版本" width="300"></el-table-column>
    <el-table-column prop="updatedOn" label="更新时间" width="300"></el-table-column>
  </el-table>
</template>

<script>

import usermanagement from "@/api/v1/usermanagement.js";

export default {
  data() {
    return {
      roleList: [],
    };
  },

  created(){
      this.getAllRole()
  },
  methods: {
      //返回角色信息的列表
      getAllRole(){
          usermanagement.getAllRole().then(response =>{
        this.roleList = response.list
      })
      .catch((error) =>{
        console.log(error);
      })
      }
  },
};
</script>