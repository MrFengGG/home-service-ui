<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="菜单名称">
      <el-input v-model="form.menuName"></el-input>
    </el-form-item>
    <el-form-item label="菜单代码">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="父级菜单">
      <CascaderSelector :url="menuListUrl" label="menuName" childName="childList" v-model="form.parentCode" :checkStrictly="true"/>
    </el-form-item>
    <el-form-item label="菜单图标">
      <icon-picker v-model="form.icon"></icon-picker>
    </el-form-item>
    <el-form-item label="菜单类型">
      <el-select v-model="form.menuType" placeholder="请选择菜单类型">
        <el-option label="父级菜单" value="1"></el-option>
        <el-option label="可跳转菜单" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="优先级">
      <el-input v-model="form.priority"></el-input>
    </el-form-item>
    <el-form-item label="菜单组">
      <DataSelector :url="menuGroupUrl" dataName="form.menuGroupName" dataCode="code" v-model="form.groupCode"/>
    </el-form-item>
    <el-form-item label="菜单路径">
      <el-select v-model="form.menuPath" placeholder="请选择菜单路径">
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
import CascaderSelector from '../../form/CascaderSelector'
import DataSelector from '../../form/DataSelector'
export default {
    name: 'MenuEditPage',
    components:{
      CascaderSelector,
      DataSelector
    },
    data() {
      return {
        form: {

        },
        menuList: [],
        menuGroupList: [],
        pathList: this.$router.getPathSelector(),
        menuListUrl: this.$url.getUrl('allMenuList'),
        menuGroupUrl: this.$url.getUrl('menuGroupList')
      }
    },
    methods:{
        onSubmit(){
          const saveUrl = this.$url.getUrl('saveMenu')
          this.$requests.post(saveUrl, this.form).then(data => {
            if(data.code == 200){
              this.$message({
                type: 'success',
                message: `${ data.msg }`
              });
            }else{
              this.$message({
                type: 'warning',
                message: `菜单保存失败: ${ data.msg }`
              });
            }
          })
        },
        initForm(){
         
        },
        created(){
          initForm();
        }
    }
}
</script>