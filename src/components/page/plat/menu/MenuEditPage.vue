<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="菜单名称">
      <el-input v-model="form.menuName"></el-input>
    </el-form-item>
    <el-form-item label="菜单代码">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="父级菜单">
      <CascaderSelector :url="menuListUrl" label="menuName" dataCode="code" v-model="form.parentCode" :initValue="form.parentCode"/>
    </el-form-item>
    <el-form-item label="菜单图标">
      <icon-picker v-model="form.icon"></icon-picker>
    </el-form-item>
    <el-form-item label="菜单类型">
      <el-select v-model="form.menuType" placeholder="请选择菜单类型" clearable>
        <el-option label="父级菜单" :value="1"></el-option>
        <el-option label="可跳转菜单" :value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="优先级">
      <el-input v-model="form.priority"></el-input>
    </el-form-item>
    <el-form-item label="菜单组">
      <DataSelector :url="menuGroupUrl" dataName="groupName" dataCode="code" v-model="form.menuGroupCode" :initValue="form.menuGroupCode"/>
    </el-form-item>
    <el-form-item label="菜单路径">
      <el-select v-model="form.menuPath" placeholder="请选择菜单路径" clearable>
        <el-option v-for="path in pathList" :label="path.name" :key="path.code" :value="path.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="form.menuDesc"></el-input>
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
    name: 'MenuEditPage',
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
        pathList: this.$router.getPathSelector(),
        menuListUrl: this.$url.getUrl('allMenuList'),
        menuGroupUrl: this.$url.getUrl('menuGroupList'),
        submitUrl: this.$url.getUrl('saveMenu')
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
              this.$router.push('/plat/menu/list');
            }else{
              this.$message({
                type: 'warning',
                message: `菜单保存失败: ${ data.msg }`
              });
            }
          })
        },
        initForm(){
          if(this.$route.query.menuId){
            this.submitUrl = this.$url.getUrl('updateMenu')
            const menuDetailUrl = this.$url.getUrl('menuDetail');
            this.$requests.get(menuDetailUrl,{id: this.$route.query.menuId}).then(data => {
              if(data.code == 200){
                this.form = data.data;
              }else{
                this.$message({
                  type: 'warning',
                  message: `菜单查询失败: ${ data.msg }`
                });
              }
            });
          }
        }
    },
    created(){
      this.initForm();
    }
}
</script>