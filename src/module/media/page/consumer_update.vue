<template>
  <el-form :model="ConsumerPojo" :rules="rules" ref="ConsumerPojo" label-width="78px" class="demo-ConsumerPojo">
    <el-form-item label="姓名" style="width: 20%" prop="name">
      <el-input v-model="ConsumerPojo.name"></el-input>
    </el-form-item>

    <el-form-item label="产品" style="width: 20%" prop="product">
      <el-input v-model="ConsumerPojo.product"></el-input>
    </el-form-item>

    <el-form-item label="金额" style="width: 20%" prop="howMuch">
      <el-input v-model="ConsumerPojo.howMuch"></el-input>
    </el-form-item>

    <el-form-item label="时间"  required>
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker  type="datetime" format="yyyy-MM-dd HH:mm:ss"   placeholder="选择日期" v-model="ConsumerPojo.date" style="width: 70%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-select v-model="ConsumerPojo.type" placeholder="请选择类型">
        <el-option label="衣" value="0"></el-option>
        <el-option label="食" value="1"></el-option>
        <el-option label="住" value="2"></el-option>
        <el-option label="行" value="3"></el-option>
        <el-option label="玩" value="4"></el-option>
        <el-option label="学习" value="5"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否必须" prop="isMust">
      <el-select v-model="ConsumerPojo.isMust" placeholder="请选择">
        <el-option label="是" value="0"></el-option>
        <el-option label="否" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="textarea" v-model="ConsumerPojo.remark"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ConsumerPojo')">立即创建</el-button>
      <el-button @click="resetForm('ConsumerPojo')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>

  import * as courseApi from '../api/course';
  import utilApi from '../../../common/utils';
  import * as systemApi from '../../../base/api/system';
  export default {
    data() {
      return {
        ConsumerPojo: {
          name: '',
          product: '',
          howMuch: '',
          date: '',
          type: '',
          isMust: '',
          remark: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          product: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          howMuch: [
            { required: true, message: '请输入消费金额', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { required: true,  message: '请至少选择消费类型', trigger: 'change' }
          ],
          isMust: [
            { required: true, message: '请选择是否必须', trigger: 'change' }
          ],
          remark: [
            { required: false, message: '', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            courseApi.addConsumer(this.ConsumerPojo).then(res=>{
              if(res.success){
                this.$message.success("提交成功")
                //跳转到我的课程
                this.$router.push({ path: '/consumer_list'})
              }else{
                this.$message.error(res.message)
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>


</style>

