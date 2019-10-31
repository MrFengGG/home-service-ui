<template>
    <div>
        <el-row>
            <el-col :span="3">
                <el-button type="danger" icon="el-icon-delete" @click="toggleSliderMenu" style="margin-top:10px"></el-button>
            </el-col>
            <el-col :span="17">
                <el-menu class="el-menu-demo" active-text-color="#ffd04b" mode="horizontal" @select="handleSelect">
                    <el-menu-item v-for="menu in menuList" v-bind:key="menu.code"><a>{{menu.grop_name}}</a></el-menu-item>
                    
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
      props : {
          groupUrl : {
            type: String,
            default: "/menu/getAllGroup"
          }
      },
      data(){
          return {menuList : [
                  {
        "grop_name" : "管理平台",
        "code" : "plat"
    }
          ]}
      },
      created(){
        request.get(this.groupUrl)
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
            console.log(11);
        }
      },
  }
</script>