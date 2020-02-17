<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.realName"></el-input>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="form.nickName"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="form.mobile"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="头像">
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="form.headImage" :src="form.headImage" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="生日">
        <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd hh:mm:ss">
        </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button type="primary" @click="onSubmit">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<style >
    .el-input, .el-textarea{
        width : 80%
    }
    .el-select,.el-cascader{
        width : 80%
    } 
    div.jsoneditor-menu{
      background-color: #909399;
      border-bottom: #909399
    }
    div.jsoneditor{
      border: 1px solid #909399;
    }
    div.jsoneditor-tree{
      min-height: 400px;
    }
    .el-input__inner, .el-date-editor--datetimerange,.el-date-editor{
      width: 100% !important
    }
</style>
<script>
import DataSelector from '../../../form/DataSelector'
import CascaderSelector from '../../../form/CascaderSelector'
export default {
    name: 'UserEditPage',
    components:{
      DataSelector,
      CascaderSelector
    },
    data() {
      return {
        form: {
        },
        menuList: [],
        menuGroupList: [],
        submitUrl: this.$url.getUrl('saveUser'),
        userDetailUrl: this.$url.getUrl('findUser')
      }
    },
    methods:{
        onSubmit(){
          this.$requests.post(this.submitUrl, this.form).then(data => {
            if(data.code == 200){
              this.$message({
                type: 'success',
                message: `${ data.msg }`
              });
              this.$router.push('/plat/user/list');
            }else{
              this.$message({
                type: 'warning',
                message: `用户保存失败: ${ data.msg }`
              });
            }
          })
        },
        initForm(){
          if(this.$route.query.userId){
            this.submitUrl = this.$url.getUrl('updateUser')
            this.$requests.get(this.userDetailUrl,{userId: this.$route.query.userId}).then(data => {
              if(data.code == 200){
                this.form = data.data;
              }else{
                this.$message({
                  type: 'warning',
                  message: `用户查询失败: ${ data.msg }`
                });
              }
            });
          }
        },
        handleAvatarSuccess(res, file) {
            this.form.headImage = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {   
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    created(){
      this.initForm();
    }
}
</script>