<template>
  <div class="userList">
    <h3>用户管理
      <span>
        <el-button icon="el-icon-search" @click="getUserList">查询</el-button>
      </span>
      <el-button type="text" icon="el-icon-plus" @click="addUser">添加用户</el-button>
    </h3>
    <div class="list">
      <el-table
        border
        :stripe="true"
        size="mini"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index" label="序号">
        </el-table-column>
        <el-table-column
          prop="userName" label="用户名">
        </el-table-column>
        <el-table-column
          prop="createDate" label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updateDate" label="修改时间">
        </el-table-column>
        <el-table-column
          fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.row)" type="text" size="small">修改密码</el-button>
            <el-button type="danger" icon="el-icon-delete" plain  @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="dialogConf.title"
      :visible.sync="dialogConf.show"
      :width="dialogConf.width">
      <component :is="dialogConf.view"
                 @close="closeDialog"
                 :refresh="getUserList"
                 :userName="rowData.userName">
      </component>
<!--      <editPassword @close="closeDialog" :userName="rowData.userName"></editPassword>-->
    </el-dialog>
  </div>
</template>

<script>
  import editPassword from './components/editPassword'
  import signIn from '../login/signIn'
  export default {
    name: "userList",
    components: {editPassword, signIn},
    data() {
      return {
        tableData: [
          // {userName: '123', createDate: '12312', updateDate: '123'}
        ],
        dialogShow: false,
        rowData: '',
        dialogConf: {
          view :'',
          show: false,
          title: '',
          width: '380px'
        }
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      async getUserList() {
        try {
          let res = await this.$http.post('users/search')
          console.log(res);
          this.tableData = res.data
        }catch (e) {
          console.log(e)
        }
      },
      addUser() {
        this.dialogConf={view :'signIn', show: true, title: '添加用户', width: '380px'}
      },
      showEdit(row) {
        this.rowData = row
        this.dialogConf={view :'editPassword', show: true, title: '修改密码', width: '380px'}
      },
      async delUser(row) {
        try {
          await this.$confirm('您确定删除该用户吗？', '提示')
          let res = await this.$http.post('users/delete', {userName: row.userName})
            console.log(res);
          if (res.code) {
            this.$message.success('删除成功！')
            this.getUserList()
          }
        }catch (e) {
          console.log(e);
        }
      },
      closeDialog() {
        this.dialogConf.show = false
        this.dialogConf.view = null
      }
    }
  }
</script>

<style scoped lang="less">
  .userList {
    h3{
      padding-left: 16px;
      padding-top: 16px;
      margin: 0;
      overflow: hidden;
      >.el-button{
        float: right;
        padding-right:16px ;
      }
    }
    .list {
      padding: 16px;
    }
  }
</style>

