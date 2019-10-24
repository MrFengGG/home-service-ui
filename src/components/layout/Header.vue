<template>
    <div>
        <el-row>
            <el-col :span="3">
                <el-button type="danger" icon="el-icon-delete" @click=""></el-button>
            </el-col>
            <el-col :span="17">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-menu-item index="3" disabled>消息中心11</el-menu-item>
                    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="4">
            </el-col>
        </el-row>
    </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
      name : 'Header',
      methods : {
          ...mapActions([
            "vuexSetUserLogin",
            "vuexSetTest"
        ]),
        toggle
      }
  }
</script>