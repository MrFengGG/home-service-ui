<template>
    <div style="width:100%">
        <el-row>
            <el-col :span="3">
                <el-button class="left-head-button" icon="el-icon-menu" @click="toggleSliderMenu" size="small"></el-button>
            </el-col>
            <el-col :span="17">
                <el-menu class="el-menu-demo" active-text-color="#ffd04b" mode="horizontal" @select="handleSelect">
                    <el-menu-item v-for="menu in menuList" v-bind:key="menu.code" v-bind:index="menu.code"><a>{{menu.grop_name}}</a></el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="4">
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
    .left-head-button{
        margin-top:15px;
        margin-left:0px;
    }
</style>
<script>
  import {mapActions} from 'vuex'
  import request from '../../util/request'
  export default {
      name : 'Header',
      props : {
          groupUrl : {
            type: String,
            default: "/menu/getAllGroup"
          }
      },
      data(){
          return {menuList : []}
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
        toggleSliderMenu(){
            this.toggleSlideMenu();
        },
        handleSelect(key){
            this.changeMenuGroup(key);
            console.log(key);
        }
      },
  }
</script>