 <template>
  <el-container>
    <el-main>
      <el-table :data="userList" style="width: 100%" border="">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="lastLoginTime" label="上次登录时间"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import usermanagement from "@/api/v1/usermanagement.js";

export default {
  data() {
    return {
      userList: [],
      body: {},
    };
  },

  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getAllUser();
  },
  methods: {
    getAllUser() {
      usermanagement
        .getAllUsers(this.body)
        .then((response) => {
          this.userList = response.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>