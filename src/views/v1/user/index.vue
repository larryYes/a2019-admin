 <template>
  <el-table :data="userList" style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180"> </el-table-column>
    <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
    <el-table-column prop="lastLoginTime" label="上次登录时间"> </el-table-column>
  </el-table>
</template>

<script>

import usermanagement from "@/api/v1/usermanagement.js";

export default {
  data() {
    return {
      userList: [],
    };
  },

  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getAllUser()
  },
  methods: {
    getAllUser(){
      usermanagement.getAllUsers().then(response =>{
        this.userList = response.list
      })
      .catch((error) =>{
        console.log(error);
      })
    },
  },
};
</script>