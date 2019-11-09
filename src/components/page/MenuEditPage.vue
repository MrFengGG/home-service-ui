<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row :gutter="30">
      <el-col :span="10">
        <el-form-item label="菜单名称">
          <el-input v-model="form.menuName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="菜单路径">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="10">
        <el-form-item label="菜单代码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="菜单图标">
          <el-select v-model="form.icon" placeholder="请选择菜单类型">
            <el-option value="shanghai">
              <i class="el-icon-edit"></i>
            </el-option>
            <el-option label="跳转菜单" value="beijing">
              <i class="el-icon-edit"></i>
            </el-option>
          </el-select>
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
            <el-option label="父级菜单" value="shanghai"></el-option>
            <el-option label="跳转菜单" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="10">
        <el-form-item label="菜单组件">
          <el-select v-model="form.componentName" placeholder="请选择菜单组件">
            <el-option v-for="component in components" :label="component.name" :key="component.code" :value="component.code"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="父级菜单">
          <el-cascader v-model="form.parentCode" :options="options" :props="{ checkStrictly: true,label: 'menuName', value: 'code', children: 'childList'}" clearable></el-cascader>
        </el-form-item>
      </el-col>
    </el-row><span>组件元属性设置</span>
    <el-divider><i class="el-icon-s-tools"></i></el-divider>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
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
</style>
<script>
import request from '../../util/request'
export default {
    name: 'MenuEditPage',
    pageName:"菜单编辑页面",
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        options: [],
        components: this.$componentUtils.getComponentList()
      }
    },
    methods:{
        onSubmit(){
          console.log(this.form)
        },
        initMenuSelector(){
          request.get('/menu/getAllMenu').then(data =>{
            if(data.code > 0){
              this.options = data.data;
            }
          });
        }
    },
    created(){
      this.initMenuSelector();
    }
}
</script>