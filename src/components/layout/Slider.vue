<template>
<div>
  <el-aside width="auto" style="height:100%">
      <el-menu class="el-menu-vertical-demo" mode="vertical" :collapse="isSlideCollapse" :router=true :default-active="currentMenuKey" @select="handMenuChange">
        <MenuItem :menuList="menuList"/>
      </el-menu>
  </el-aside>
</div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import MenuItem from '../menu/MenuItem'

  export default {
    name: 'Slider',
    components: {
      MenuItem
    },
    props : {
        menuUrl : {
          type: String,
          default: "/api/menu/getAllMenu?group=plat"
        }
    },
    data(){
        return {menuList : []}
    },
    computed: {
      ...mapGetters([
        'isSlideCollapse',
        'menuGroup',
        'currentMenuKey'
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
        this.$requests.get(this.menuUrl).then(data =>{
          if(data.code > 0){
              this.menuList = data.data;
              this.$router.$accessMenuList(data.data);
          }
        });
      },
      handMenuChange(index){
        this.changeMenu(index);
      },
      ...mapActions([
        'changeMenu'
      ])
    }
  }
</script>