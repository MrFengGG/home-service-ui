<template>
    <div style="width:100%">
        <el-row>
            <el-col :span="3">
                <el-button class="left-head-button" icon="el-icon-menu" @click="toggleSlideMenu" size="small"></el-button>
            </el-col>
            <el-col :span="17">
                <el-menu class="el-menu-demo" active-text-color="#ffd04b" mode="horizontal" @select="handleSelect" :default-active="menuGroup">
                    <el-menu-item v-for="menu in menuList" v-bind:key="menu.code" v-bind:index="menu.code"><a>{{menu.groupName}}</a></el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="4">
                <el-popover
                    placement="bottom"
                    width="300"
                    trigger="click">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>卡片名称</span>
                            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                    <el-avatar class="headImage" shape="square" size="medium" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" slot="reference"></el-avatar>
                    </el-popover>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
    .left-head-button{
        margin-top:15px;
        margin-left:0px;
    }
    .headImage{
        margin-top:11px;
    }
</style>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import request from '../../util/request'
  export default {
      name : 'Header',
      props : {
          groupUrl : {
            type: String,
            default: "api/menu/getAllGroup"
          }
      },
      data(){
          return {menuList : []}
      },
      computed: {
        ...mapGetters([
          'menuGroup'
        ])
      },
      created(){
        request.get(this.groupUrl).then(data =>{
            if(data.code > 0){
                this.menuList = data.data;
            }
        })
      },
      methods : {
        ...mapActions([
            "toggleSlideMenu",
            "changeMenuGroup"
        ]),
        handleSelect(key){
            this.changeMenuGroup(key);
        }
      },
  }
</script>