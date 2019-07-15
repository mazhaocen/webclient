<template>
  <div class="loginDiv">
<!--    <h2>用户注册</h2>-->
    <el-row type="flex"  align="middle" justify="center">
      <el-col>
        <el-form :model="formData" label-width="84px" size="small" :rules="rules" ref="ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="formData.userName" maxLength="16"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password1">
            <el-input type="password" v-model="formData.password1" maxLength="16"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="password2">
            <el-input type="password" v-model="formData.password2" maxLength="16"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div style="text-align: right">
          <el-button type="primary" @click="signIn">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
<!--        <el-button size="small" type="text" style="float: right;margin-left: 40px" @click="goToPage()">已有账号<i class="el-icon-arrow-right el-icon&#45;&#45;right"></i></el-button>-->
<!--        <el-button size="small" type="primary" style="float: right;" @click="signIn">注册</el-button>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "login",
    props:{
      refresh: Function
    },
    data() {
      return {
        formData: {
          userName: '',
          password1: '',
          password2: ''
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'},
            {min: 5, max: 16, message: '用户姓名长度为5-16位', trigger: 'blur'},
          ],
          password1: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度为6-16位', trigger: 'blur'},
            {validator: this.validatorPassword1, trigger: 'blur'}
          ],
          password2: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度为6-16位', trigger: 'blur'},
            {validator: this.validatorPassword2, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      signIn() {
        this.$refs.ruleForm.validate(async valid => {
          if (!valid) return
          try {
            let res = await this.$http.post('users/signIn', this.formData)
            if (res.code) {
              this.$message.success('添加成功！')
              this.$refs.ruleForm.resetFields()
              // this.goToPage()
              this.refresh()
              this.$emit('close')
            }
          }catch (e) {
            console.log(e);
          }
        })

      },
      goToPage() {
        this.$router.push({name: 'userList.vue'})
      },
      validatorPassword2(rule, value, callback) {
        if (value !== this.formData.password1) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      },
      validatorPassword1(rule, value, callback) {
        if (this.formData.password2 && value !== this.formData.password2) {
          this.$refs.ruleForm.validateField('password2');
        } else {
          callback();
        }
      },
      cancel() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .loginDiv{
    width: 320px;
    margin: auto;
  }
</style>
