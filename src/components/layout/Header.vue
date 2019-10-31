<template>
    <div>
        <el-row>
            <el-col :span="3">
                <el-button type="danger" icon="el-icon-delete" @click="toggleSliderMenu"></el-button>
            </el-col>
            <el-col :span="17">
                <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-menu-item index="3">消息中心</el-menu-item>
                    <el-menu-item index="4">订单管理</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="4">
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>

</style>
<script>
  import {mapActions} from 'vuex'
  import request from '../../util/request'
  export default {
      name : 'Header',
      methods : {
        ...mapActions([
            "toggleSlideMenu",
            "changeMenuGroup"
        ]),
        toggleSliderMenu(){
            this.toggleSlideMenu();
        },
        handleSelect(key, keyPath){
            this.changeMenuGroup(key);
        }
      }
  }
</script>