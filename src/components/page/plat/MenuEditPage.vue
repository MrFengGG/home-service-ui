<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row :gutter="30">
      <el-col :span="10">
        <el-form-item label="菜单名称">
          <el-input v-model="form.menuName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="菜单代码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="10">
        <el-form-item label="父级菜单">
          <el-cascader v-model="form.parentCode" :options="menuList" :props="{ checkStrictly: true,label: 'menuName', value: 'code', children: 'childList'}" clearable></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="菜单图标">
          <icon-picker v-model="form.icon"></icon-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="10">
        <el-form-item label="菜单类型">
          <el-select v-model="form.menuType" placeholder="请选择菜单类型">
            <el-option label="父级菜单" value="1"></el-option>
            <el-option label="可跳转菜单" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="菜单组">
          <el-select v-model="form.menuGroupCode" placeholder="请选择菜单组">
            <el-option v-for="menuGroup in menuGroupList" :label="menuGroup.groupName" :key="menuGroup.code" :value="menuGroup.code"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>
<style >
    .el-input{
        width : 90%
    }
    .el-select,.el-cascader{
        width : 100%
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
</style>
<script>
import vueJsonEditor from 'vue-json-editor'
export default {
    name: 'MenuEditPage',
    pageName:"菜单编辑页面",
    components:{
      vueJsonEditor
    },
    data() {
      return {
        form: {
          componentName: '',

        },
        menuList: [],
        menuGroupList: [],
        pathList: this.$router.getPathSelector()
      }
    },
    methods:{
        onSubmit(){
          this.$requests.post('/api/menu/addMenu', this.form).then(data => {
            if(data.code > 0){

            }
          })
        },
        initMenuSelector(){
          this.$requests.get('/api/menu/getAllMenu').then(data =>{
            if(data.code > 0){
              this.menuList = data.data;
            }
          });
        },
        initMEnuGroupSelector(){
          this.$requests.get('/api/menu/getAllGroup').then(data =>{
            if(data.code > 0){
              this.menuGroupList = data.data;
            }
          });
        },
    },
    created(){
      this.initMenuSelector();
      this.initMEnuGroupSelector();
    },
    watch: {
      'form.componentName': function(val){
        this.handComponentChange(val)
      }
    }
}
</script>