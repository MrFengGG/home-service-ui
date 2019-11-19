<template>
    <div class="menu-item">
        <div v-for="menu in menuList" :key="menu.code">
            <el-submenu :index="menu.code" v-if="menu.childList">
                <template slot="title">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.menuName}}</span>
                </template>
                <MenuItem :menuList="menu.childList"></MenuItem>
            </el-submenu>
            <el-menu-item v-else :index="menu.menuPath">
                <template slot="title">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.menuName}}</span>       
                </template>
            </el-menu-item>
        </div>
    </div>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu--collapse > .menu-item > div > .el-submenu >.el-submenu__title span{
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-menu--collapse > .menu-item > div > .el-submenu >.el-submenu__title .el-submenu__icon-arrow{
    display: none;
  }
</style>
<script>
  export default {
      name: 'MenuItem',
      props : {
          menuList : {
            type: Array,
          }
      },   
  }
</script>