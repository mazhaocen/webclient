<template>
  <div class="loginDiv">
    <el-row type="flex"  align="middle" justify="center">
      <el-col>
        <el-form :model="formData" label-width="84px" size="small" :rules="rules" ref="ruleForm">
<!--          <el-form-item label="旧密码" prop="oldPassword">-->
<!--            <el-input type="password" v-model="formData.oldPassword" maxLength="16"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="新密码" prop="password1">
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
          <el-button type="primary" size="small" @click="save">保存</el-button>
          <el-button size="small" @click="cancel">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "editPassword",
    props:{
      userName: String
    },
    data() {
      return {
        formData: {
          // oldPassword: '',
          password1: '',
          password2: ''
        },
        rules: {
          // oldPassword: [
          //   {required: true, message: '请输入旧密码', trigger: 'blur'},
          //   {min: 5, max: 16, message: '密码长度为6-16位', trigger: 'blur'},
          // ],
          password1: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度为6-16位', trigger: 'blur'},
            {validator: this.validatorPassword1, trigger: 'blur'}
          ],
          password2: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度为6-16位', trigger: 'blur'},
            {validator: this.validatorPassword2, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      save() {
        this.$refs.ruleForm.validate(async valid => {
          if (!valid) return
          let params = {
            ...this.formData,
            userName: this.userName
          }
          console.log({...params});
          try {
            let res = await this.$http.post('users/updatePassword', params)
            if (res.code) {
              this.$message.success('修改成功！')
              this.cancel()
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
