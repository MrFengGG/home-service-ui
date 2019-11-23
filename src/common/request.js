import axios from 'axios'
import store from '../store/store'
import router from '../router/router'
import { Message } from 'element-ui';


const get = function(url, param){
    const config = {
        params:param,
        headers:commonHeader()
    }
    return axios.get(url, config).then(response => {
        return new Promise(function(resolve, reject){
            if(response.status == 200){
                if((response.data.code == 400 || response.data.code == 401) && store.getters.token){
                    handSessionTimeOut();
                }
                resolve(response.data);
            }else{
                Message({
                    showClose: true,
                    message: (response.data && response.data.msg) || '服务器异常',
                    type: 'error'
                });
                reject(response.data);
            }
        })
    })
}
const post = function(url, param){
    return axios.post(url, param, {headers:commonHeader()}).then(response => {
        return new Promise(function(resolve, reject){
            if(response.status == 200){
                if(response.data.code == 400 || response.data.code == 401){
                    handSessionTimeOut()
                }
                resolve(response.data);
            }
        })
    })
}

const handSessionTimeOut = function(){
    Message({
        showClose: true,
        message: "会话超时",
        type: 'error'
    });
    setTimeout(function(){
        store.dispatch('clearToken');
        router.push('/login');
    },1000);
}
export default{
    get,
    post
}
const commonHeader = function(){
    return {token : store.getters.token};
}
