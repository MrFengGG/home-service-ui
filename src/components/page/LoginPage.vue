<template>
    <div class="login-container">
    <el-form ref="form" :model="form" class="demo-ruleForm login-page" label-position="left" label-width="0px">
        <h3 class="title">系统登录</h3>
            <el-form-item>
                <el-input type="text" 
                    v-model="form.username" 
                    auto-complete="off" 
                    placeholder="用户名">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="form.checked" class="rememberme">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit">登录</el-button>
            </el-form-item>
    </el-form>
    </div>
</template>
<style scoped>
    .login-container {
    width: 100%;
    height: 100%;
    }
    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: center;
    }
</style>
<script>
import {mapActions} from 'vuex'
export default {
    name: 'LoginPage',
    pageName:"登陆页面",
    data(){
        return {
            form:{}
        }
    },
    methods: {
        ...mapActions([
            "changeToken"
        ]),
        handleSubmit(){
            this.$requests.get('/api/auth/accessToken',this.form).then(data =>{
                if(data.code <= 0){
                    this.$message({
                        type: 'warning',
                        message: `登录失败: ${ data.msg }`
                    });
                }else{
                    this.changeToken(data.data.token)
                    
                    this.$router.push('/');
                }
            });
            console.log(this.form)
        }
    }
}
</script>