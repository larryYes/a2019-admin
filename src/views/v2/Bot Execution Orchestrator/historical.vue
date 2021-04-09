<template>
  <div>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="getAllHistoricalBot()">刷新</el-button>
    </div>
    <el-table :data="progressList" style="width: 100%" fit="true">
      <el-table-column prop="jobExecutionStatus" label="状态" width="150"></el-table-column>
      <el-table-column label="项目名称" width="240" >
        <template slot-scope="scope">
          <span v-if="scope.row.automationName">{{scope.row.automationName}}</span>
          <span v-else>==</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.startDateTime | sctTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.endDateTime | sctTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deviceName" label="设备名称" width="130"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.prevent="skipDetailPage(scope.row.id)" type="text" size="small">项目详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px">
      <el-pagination
        layout="prev, pager, next"
        :total="totleItemsNum"
        :page-size="pageSize"
        @prev-click="pageUp"
        @next-click="pageDown"
        @current-change="pageJump"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import botExcecutionOrchestrator from "@/api/v2/botExecutionOrchestrator.js";
import common from "@/api/v1/common";

export default {
  data() {
    return {
      progressList: [],
      page: {},
      number: 0,
      body: {
        sort: [
          {
            field: "modifiedOn",
            direction: "desc",
          },
        ],
        filter: {},
        fields: [],
        page: {
          offset: 0,
          length: 20,
        },
      },
    };
  },
  created() {
    this.getAllHistoricalBot();
  },
  methods: {
    //获取所有历史活动
    getAllHistoricalBot() {
      common
        .getHistoryActivity(this.body)
        .then((response) => {
          this.progressList = response.list;
          this.page = response.page;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //点击跳转项目详情
    skipDetailPage(id) {
      this.$router.push({
        path: `/activity/historical/${id}/detail`,
        query: { param: this.param },
      });
    },
    //向下翻页
    pageDown() {
      this.body.page.offset += this.body.page.length;
      this.getAllHistoricalBot();
    },
    //向上翻页
    pageUp() {
      this.body.page.offset -= this.body.page.length;
      this.getAllHistoricalBot();
    },
    //分页跳转
    pageJump(val) {
      this.body.page.offset = this.body.page.length * (val - 1);
      this.getAllHistoricalBot();
    },
  },
  filters: {
    sctTime(timeData) {
      let time = timeData.slice(11, 19);
      let date = timeData.slice(0, 10);
      return time + " CST " + date;
    },
  },
  computed: {
    totleItemsNum() {
      return this.page.total;
    },
    pageSize() {
      return this.body.page.length;
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
      //   this.getAllHistoricalBot()
    },
  },
};
</script>