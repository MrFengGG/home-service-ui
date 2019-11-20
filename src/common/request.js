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
                if(response.data.code == 400){
                    store.dispatch('clearToken');
                    router.push('/login');
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
    const config = {
        params:param,
        headers:commonHeader()
    }
    return axios.post(url, config).then(response => {
        return new Promise(function(resolve, reject){
            if(response.status == 200){
                resolve(response.data);
            }
        })
    })
}
export default{
    get,
    post
}
const commonHeader = function(){
    return {token : store.getters.token};
}
