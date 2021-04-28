 <template>
  <el-container>
    <el-main>
      <el-table :data="credentialsList" style="width: 100%" border="">
        <el-table-column prop="name" label="name" width="180"></el-table-column>
        <el-table-column prop="version" label="version" width="180"></el-table-column>
        <el-table-column prop="updatedOn" label="updatedOn"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import credential from "@/api/v2/credentialVault.js";

export default {
  data() {
    return {
      credentialsList: [],
    };
  },

  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getCredentials();
  },
  methods: {
    getCredentials() {
      credential
        .searchCredentials()
        .then((response) => {
          this.credentialsList = response.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>