<template>
<div>
  <el-aside width="auto" style="height:100%">
      <el-menu class="el-menu-vertical-demo" mode="vertical" :collapse="isSlideCollapse" :router=true>
        <MenuItem :menuList="menuList"/>
      </el-menu>
  </el-aside>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import request from '../../util/request'
  import MenuItem from '../menu/MenuItem'

  export default {
    name: 'Slider',
    components: {
      MenuItem
    },
    props : {
        menuUrl : {
          type: String,
          default: "/menu/getAllMenu"
        }
    },
    data(){
        return {menuList : []}
    },
    computed: {
      ...mapGetters([
        'isSlideCollapse',
        'menuGroup'
      ])
    },
    created : function(){
      this.handMenuGroupChange(this.menuGroup);
    },
    watch: {
      menuGroup(){
        this.handMenuGroupChange(this.menuGroup);
      }
    },
    methods: {
      handMenuGroupChange(menuGroup){
        request.get(this.menuUrl).then(data =>{
          if(data.code > 0){
              this.menuList = data.data;
              this.$router.$addRoutes(this.$componentUtils.getRouterList(data.data));
          }
        })
      }
    }
  }
</script>