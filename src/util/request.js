import axios from 'axios'
import store from '../store/store'


const get = function(url, param){
    const config = {
        params:param,
        headers:commonHeader()
    }
    return axios.get(url, config).then(response => {
        return new Promise(function(resolve, reject){
            if(response.status == 200){
                resolve(response.data);
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
