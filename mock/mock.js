import Mock from 'mockjs';
const fs = require('fs');
const path = require('path');

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

Mock.mock('/auth/accessToken', 'get', function(params){
    return successResult({
        token : "abcdexf",
        expireTime : "123"
    });
});
Mock.mock('/auth/checkToken', 'get', function(params){
    const user = loadJsonFile('./user.json');
    return successResult(user[0]);
});

Mock.mock('/menu/getAllGroup', 'get', function(params){
    const menu = loadJsonFile('./menuGroup.json');
    return successResult(menu);
})
Mock.mock('/menu/getAllMenu', 'get', function(params){
    const menu = loadJsonFile('./menu.json');
    return successResult(menu);
})