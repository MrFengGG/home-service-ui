import Mock from 'mockjs';
let userList = require("./user.json")
let menuGroupList = require("./menuGroup.json")
let menuList = require("./menu.json")

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
Mock.mock('/menu/getAllMenu', 'get', function(req){
    console.log(menuList);
    return successResult(menuList);
})
Mock.mock('/menu/addMenu', 'post', function(req){
    const param = JSON.parse(req.body);
    menuList.push(param);
    console.log(menuList);
    return successResult();
})
Mock.mock('/menu/pageQueryMenu','post', function(req){
    const param = JSON.parse(req.body)
    console.log(param);
    const pageNo = param.pageNo;
    const pageSize = param.pageSize;
    const data = menuList.slice((pageNo - 1) * pageSize, (pageNo) * pageSize);
    return successResult({
        total : menuList.length,
        data : data
    })
})