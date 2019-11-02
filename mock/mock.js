import Mock from 'mockjs';
var userList = require("./user.json")
var menuGroupList = require("./menuGroup.json")
var menuList = require("./menu.json")

const loadJsonFile = function(filePath){
    const json = fs.readFileSync(path.resolve(__dirname,filePath), 'utf-8');
    return JSON.parse(json);
}
const successResult = function(obj){
    return {
        code : 1,
        data : obj,
        msg  : "成功"
    }
}

Mock.mock('/auth/accessToken', 'get', function(){
    return successResult({
        token : "abcdexf",
        expireTime : "123"
    });
});
Mock.mock('/auth/checkToken', 'get', function(){
    return successResult(userList[0]);
});

Mock.mock('/menu/getAllGroup', 'get', function(){
    return successResult(menuGroupList);
})
Mock.mock('/menu/getAllMenu', 'get', function(param){
    console.log(param);
    return successResult(menuList);
})