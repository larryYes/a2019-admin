<template>
  <el-table :data="triggerList" style="width: 100%">
    <el-table-column prop="userId" label="用户ID" width="180"></el-table-column>
    <el-table-column prop="id" label="用户" width="200"></el-table-column>
    <el-table-column prop="botPath" label="机器人路径" width="200"></el-table-column>
    <el-table-column prop="botName" label="bot名称" width="100"></el-table-column>
    <!-- <el-table-column label="操作" width="120"> -->
    <!-- <template slot-scope="scope">
        <el-button @click.prevent="skipDetailPage(scope.row.id)" type="text" size="small">项目详情</el-button>
      </template>S
    </el-table-column>-->
  </el-table>
</template>

<script>
import common from "@/api/v1/common";
import usermanagement from "@/api/v1/usermanagement";

export default {
  data() {
    return {
      triggerList: [],
      number: 0,
      body: {},
      getUserNameBody: {
        page: {
          offset: 0,
          total: 0,
          totalFilter: 0,
        },
        filter: {
          operator: "or",
          operands: [],
        },
      },
    };
  },
  created() {
    this.getAllTrigger();
  },
  methods: {
    getAllTrigger() {
      common
        .getTriggers(this.body)
        .then((response) => {
          this.triggerList = response.list;
          this.getUserName();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserName() {
      let userIdList = this.getUserId();
      let operands = [];
      for (let i = 0; i < userIdList.length; i++) {
        operands.push({
          operator: "eq",
          field: "id",
          value: `${userIdList[i]}`,
        });
      }
      this.getUserNameBody.filter.operands = operands;
      usermanagement.getAllUsers(this.getUserNameBody).then((response) => {
        for (let i = 0; i < response.list.length; i++) {
          for (let j = 0; j < this.triggerList.length; j++) {
            if ((this.triggerList[j].userId = response.list[i].id)) {
              this.triggerList[j].id = response.list[i].username;
            }
          }
        }
      });
    },
    getUserId() {
      let userIdList = [];
      for (let i = 0; i < this.triggerList.length; i++) {
        if (this.triggerList[i].userId in userIdList) {
        } else {
          userIdList.push(this.triggerList[i].userId);
        }
      }
      return userIdList;
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
      //   this.getAllSchedules()
    },
  },
};
</script>