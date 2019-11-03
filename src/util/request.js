import axios from 'axios'
import store from '../store/store'


const get = function(url, param){
    return axios.get(url, param, commonHeader()).then(response => {
        return new Promise(function(resolve, reject){
            if(response.status == 200){
                resolve(response.data);
            }
        })
    })
}
const post = function(url, param){
    return axios.post(url, param, commonHeader()).then(response => {
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
