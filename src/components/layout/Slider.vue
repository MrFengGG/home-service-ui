<template>
<el-collapse-transition>
  <el-aside width="auto">
      <el-menu class="el-menu-vertical-demo" mode="vertical" :collapse="isSlideCollapse">
        <MenuItem :menuList="menuList"/>
      </el-menu>
  </el-aside>
</el-collapse-transition>
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
      created(){
        request.get(this.menuUrl).then(data =>{
            if(data.code > 0){
                this.menuList = data.data;
            }
        })
      },
      computed: {
        ...mapGetters([
          'isSlideCollapse',
        ])
      }
  }
</script>