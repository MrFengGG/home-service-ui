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
  import components from '../../router/components'
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
              console.log(this.menuToRouters(data.data))
              this.$router.$addRoutes(this.menuToRouters(data.data));
          }
        })
      },
      menuToRouters(menuList){
        let routers = [];
        for(let menu of menuList){
          if(menu.menu_type == 0){
            routers.push({
                name : menu.code,
                component : components[menu.component_name],
                path : menu.path,
                props : true,
                params : menu.component_param
            });
          }
          if(menu.childList){
            routers = routers.concat(this.menuToRouters(menu.childList))
          }
        }
        return routers;
      }
    }
  }
</script>