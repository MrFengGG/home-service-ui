<template>
    <el-container>
        <slot name="slider"></slot>
      <el-container>
        <el-header>
          <slot name="header"></slot>
        </el-header>
        <el-main>
          <slot name="main"></slot>
        </el-main>
        <el-footer>
          <slot name="foot"></slot>
        </el-footer>
      </el-container>
    </el-container>
</template>
<style>
  html,body,#app,.el-container{
    padding: 0px;
    margin: 0px;
    height: 100%;
  }
  .el-header{
    text-align: center;
    line-height: 40px;
    padding: 0px;
    margin:0px;
  }
  .el-aside{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
 
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
<script>
  export default {
      name: 'Container',
      props: {
          msg: String
      }
  }
</script>