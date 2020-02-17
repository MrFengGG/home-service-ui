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
                        <div class="clearfix">
                            <span>{{currentUser.nickName}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="logout()">退出登录</el-button>
                        </div>
                    <el-avatar class="headImage" shape="square" size="medium" :src="currentUser.headImage" slot="reference"></el-avatar>
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
  export default {
      name : 'Header',
      data(){
          return {
              menuList : [],
              menuGroupListUrl: this.$url.getUrl('menuGroupList'),
              logoutUrl: this.$url.getUrl('logout'),
              currentUserUrl: this.$url.getUrl('currentUser'),
              currentUser: {

              }
            }
      },
      computed: {
        ...mapGetters([
          'menuGroup'
        ])
      },
      created(){
        this.$requests.get(this.menuGroupListUrl).then(data =>{
            if(data.code > 0){
                this.menuList = data.data;
            }
        });
        this.$requests.get(this.currentUserUrl).then(data =>{
            if(data.code > 0){
                this.currentUser = data.data;
            }
        });
      },
      methods : {
        ...mapActions([
            "toggleSlideMenu",
            "changeMenuGroup"
        ]),
        handleSelect(key){
            this.changeMenuGroup(key);
        },
        logout(){
            this.$requests.get(this.logoutUrl).then(data =>{
                if(data.code > 0){
                    this.$message({
                        type: 'success',
                        message: '退出登录成功'
                    });
                    this.$router.push('/login');
                }
            });
        }
      },
  }
</script>