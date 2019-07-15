<template>
  <div>
    <div class="formDiv">
      <el-form :model="formData" label-width="74px" ref="ruleForm">
        <el-form-item label="路径" prop="path">
          <el-input v-model="formData.path" maxLength="100"></el-input>
        </el-form-item>
        <el-form-item label="字段配置" prop="path">
          <el-input type="textarea" v-model="formData.field" maxLength="100"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button @click="addPort">添加</el-button>
      <el-button @click="testPort">测试</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "port",
    data() {
      return {
        formData: {}
      }
    },
    methods:{
      async addPort() {
        console.log(JSON.stringify(this.formData.field));
        let res = await this.$http.post('ports/addPort', {
          ...this.formData,
        })
        console.log(res);
      },
     async testPort() {
       let res = await this.$http.post('port/search')
       console.log(res);
     }
    }
  }
</script>

<style scoped lang="less">
.formDiv{
  overflow: hidden;
}
</style>
