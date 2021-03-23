<template>
  <el-form ref="deployData" :model="deployData" label-width="150px">
    <el-form-item label="项目名称">
      <el-input v-model="deployData.automationName"></el-input>
    </el-form-item>
    <el-form-item label="BOT">
      <el-select v-model="deployData.fileId" placeholder="请选择BOT">
        <el-option label="apitest" value="267"></el-option>
        <el-option label="apilook" value="267"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Runner用户">
      <el-select v-model="deployData.runAsUserIds" placeholder="请选择用户">
        <el-option label="apirunner" value="34"></el-option>
        <el-option label="duchapirunner" value="43"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备池">
      <el-select v-model="deployData.poolIds" placeholder="请选择设备池">
        <el-option label="duch_api_test" value="8"></el-option>
        <el-option label="liugji-legion" value="5"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否覆盖默认设备">
      <el-switch v-model="deployData.overrideDefaultDevice"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即部署</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    <el-form-item label="返回参数">
      <el-input type="textarea" v-model="respData"></el-input>
    </el-form-item>
  </el-form>
</template>


<script>
import deploy from "@/api/v3/deploy.js";

export default {
  data() {
    return {
      deployData: {
        automationName: "default",
        fileId: 0,
        runAsUserIds: [],
        poolIds: [],
        overrideDefaultDevice: false,
      },
      respData: "",
    };
  },
  methods: {
    onSubmit() {
      console.log(this.deployData);
      deploy.deployBot(this.deployData)
        .then((response) => {
          this.respData = response.data.deploymentId;
        })
        .catch((error) => {
          this.respData = error.message;
          console.log(error);
        });
    },
  },
};
</script>