<template>
  <div class="home">
    <el-container class="container">
      <el-aside width="160px" class="aside">
        <div>
          <el-avatar :size="90">logo</el-avatar>
        </div>
        <div>
          <el-menu :router="true">
            <el-menu-item v-for="(m,index) in menuList" :key="index" :index="`${index+1}`" :route="{path:m.path}">
              <i :class="m.class"></i>
              <span>{{m.name}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container class="container2">
        <el-header class="header" height="80px">
          <el-row type="flex" align="middle" class="headerRow">
            <el-col :span="10">
              <el-input type="search" placeholder="搜索..."></el-input>
            </el-col>
            <el-col :span="2" :offset="12">
              <el-dropdown style="float: right;" size="lager" class="dropDown">
                <div>
                  <el-avatar class="avatar" icon="el-icon-user-solid"> user <i class="el-icon-arrow-down el-icon--right"></i></el-avatar>
                  <p>{{userName}}</p>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>退出</el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="showEdit">修改密码</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="main">
          <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="main-page">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogShow"
      width="380px">
      <editPassword @close="closeDialog" :userName="userName"></editPassword>
    </el-dialog>
  </div>
</template>

<script>
  // @ is an alias to /src
  import editPassword from './userManage/components/editPassword'
  export default {
    name: 'home',
    components: {editPassword},
    data() {
      return {
        dialogShow: false,
        rowData: '',
        userName: 'admin',
        menuList: [
          {name: '首页', path: '/home', class: 'el-icon-location'},
          {name: '用户管理', path: '/userList'},
          {name: '接口管理', path: '/port'},
        ]
      }
    },
    methods: {
      goto(path) {
        this.$router.push(path)
      },
      showEdit(row) {
        this.rowData = row
        this.dialogShow = true
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      closeDialog() {
        this.dialogShow = false
      }
    },
    watch: { //监控路径变化  当路径发送变化的时候，改变面包屑导航的显示
      '$route'(val) {
        console.log(val);
      }
    }
  }
</script>
<style scoped lang="less">
  .home{
    height: 100vh;
    .container{
      height: 100%;
      .aside {
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: 100%;
        margin-right: 16px;
        >div{
          margin-top: 10px;
        }
      }
      .container2 {
        margin-top: 40px;
        .header {
          background-color: #fff;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          border-radius: 4px;

          .headerRow {
            height: 100%;
            .dropDown{
              cursor: pointer;
              >div{
                overflow: hidden;
                .avatar{
                  float: left;
                  margin-right: 6px;
                }
                p{
                  float: right;
                }
              }
            }
          }
        }
        .main{
          padding-left: 0;
          .breadcrumb{
            background-color: #fff;
            padding: 10px 10px;
            border-radius: 4px;
          }
          .main-page{
            margin: 20px 0;
            padding: 16px;
            background-color: #fff;
          }
        }
      }
    }
  }

</style>
