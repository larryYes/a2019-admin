<template>
  <div>
    <div>
      <h2>{{req.automationName}}</h2>
    </div>

    <el-container>
      <el-container>
        <el-header>机器人</el-header>
        <el-main>
          <p>机器人：</p>
          <p>{{req.jobName}}</p>
        </el-main>
      </el-container>
      <el-container>
        <el-header>设备</el-header>
        <el-main>
          <p>设备名称：</p>
          <p>{{req.deviceName}}</p>
          <p>使用者：</p>
          <p>{{req.username}}</p>
        </el-main>
      </el-container>
      <el-container>
        <el-header>名称+描述</el-header>
        <el-main>
          <p>名称：</p>
          <p>{{req.automationName}}</p>
          <p>描述：</p>
          <p>{{req.command}}</p>
        </el-main>
      </el-container>
    </el-container>
    <el-container>
      <el-header>运行信息详情</el-header>
      <el-main>
        <div class="wrap">
          <div style="width:50%">
            <p>开始日期</p>
            <p>{{req.startDateTime}}</p>
          </div>
          <div style="width:50%">
            <p>结束日期</p>
            <p>{{req.endDateTime}}</p>
          </div>
        </div>
        <div class="wrap">
          <div style="width:50%">最后状态</div>
          <div style="width:50%">最后一个机器人</div>
        </div>
        <div>最后一项操作</div>
        <div>
          <p>错误消息</p>
          <p>{{req.message}}</p>
        </div>
      </el-main>
    </el-container>
    <el-container>
      <el-header>一般详情信息</el-header>
      <el-main>
        <div class="wrap">
          <div class="General-Details">
            <p>上次修改时间</p>
            <p>{{req.modifiedOn}}</p>
          </div>
          <div class="General-Details">
            <p>修改者</p>
            <p>{{req.modifiedBy}}</p>
          </div>
          <div class="General-Details">
            <p>对象类型</p>
            <p></p>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import common from "@/api/v1/common";
import usermanagement from "@/api/v1/usermanagement";
export default {
  data() {
    return {
      id: "",
      req: {},
      bodyOfGetAllUsers: {
        page: {
          offset: 0,
          total: 0,
          totalFilter: 0,
        },
        filter: {
          operator: "eq",
          field: "id",
          value: "34",
        },
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.loadInfo();
  },
  methods: {
    loadInfo() {
      common
        .getDetailInfo(this.id)
        .then((response) => {
          this.req = response;
          this.searchUserName();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchUserName() {
      this.bodyOfGetAllUsers.filter.value = this.req.modifiedBy;
      usermanagement.getAllUsers(this.bodyOfGetAllUsers).then((response) => {
        this.req.modifiedBy = response.list[0].username;
      });
    },
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: left;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

p {
  text-align: left;
}
div {
  text-align: left;
}
.wrap {
  display: flex;
  justify-content: space-between;
}
.General-Details {
  width: 30%;
}
</style>