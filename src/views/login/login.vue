<template>
  <div class="loginDiv">
    <h2>用户登录</h2>
    <el-row type="flex"  align="middle" justify="center">
      <el-col>
        <el-form :model="formData" label-width="84px" size="small" :rules="rules" ref="ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="formData.userName" maxLength="16"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password" maxLength="16"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
<!--        <el-button size="small" type="text" style="float: right;margin-left: 40px" @click="goToPage">注册账号<i class="el-icon-arrow-right el-icon&#45;&#45;right"></i></el-button>-->
        <el-button size="small" type="primary" style="float: right;" @click="login">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        formData: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'},
            {min: 5, max: 16, message: '用户姓名长度为5-16位', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度为6-16位', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      login() {
        this.$refs.ruleForm.validate((async valid => {
          if (valid) {
            try {
              let res = await this.$http.post('users/login', this.formData)
              if (res.code) {
                this.$message.success('登录成功！')
                // console.log(res.data.token);
                // sessionStorage.setItem('token', res.data.token)
                this.$refs.ruleForm.resetFields()
                this.$router.push('home')
              }
            } catch (e) {
              console.log(e);
            }
          }
        }))
      },
      goToPage() {
        this.$router.push({name: 'signIn'})
      },
    }
  }
</script>

<style scoped>
  .loginDiv{
    background-color: #fff;
    width: 320px;
    padding: 20px;
    margin: 40px auto;
    h2{
      text-align: center;
    }
  }
</style>

