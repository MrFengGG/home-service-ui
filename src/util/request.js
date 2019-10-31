import axios from 'axios'
import store from '../store/store'


const get = function(url, param){
    return axios.get(url, param, commonHeader());
}
const post = function(url, param){
    return axios.post(url, param, commonHeader());
}
export default{
    get,
    post
}
const commonHeader = function(){
    return {token : store.getters.token};
}
