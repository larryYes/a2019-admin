 <template>
  <el-container>
    <el-main>
      <el-table :data="poolsList" style="width: 100%" border>
        <el-table-column prop="name" label="name" width="180"></el-table-column>
        <el-table-column prop="status" label="status" width="180"></el-table-column>
        <el-table-column prop="detailedStatus" label="detailedStatus"></el-table-column>
        <el-table-column prop="deviceCount" label="deviceCount"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import pools from "@/api/v2/pools.js";

export default {
  data() {
    return {
      poolsList: [],
    };
  },

  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    this.getPools();
  },
  methods: {
    getPools() {
      pools
        .getAllPools()
        .then((response) => {
          this.poolsList = response.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>