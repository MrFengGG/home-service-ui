//menu
const userMenuList = '/menu/get_user_menu';
const allMenuList = '/menu/query';
const menuDetail = '/menu/find_by_id';
const menuGroupList = '/menu/get_menu_groups';
const saveMenu = '/menu/save'
const updateMenu = '/menu/update'
const removeMenu = '/menu/remove'
const giveMenuRole = '/menu/give_role'
const menuRole = '/menu/get_role'

//sys
const login = '/auth/access_token'
const logout = '/auth/clear_token'
const currentUser = '/auth/check_token'

//role
const allRole = '/role/get_all'
const getRolePage = '/role/pagination_query'
const saveRole = '/role/save'
const removeRole = '/role/remove'

//user
const getUserPage = '/user/pagination_query'
const giveUserRole = '/user/give_role'
const updateUser = '/user/update'
const saveUser = '/user/save'
const freezeUser = '/user/freeze'
const findUser = '/user/get'

const urlMap = {
    userMenuList,
    allMenuList,
    menuDetail,
    menuGroupList,
    saveMenu,
    removeMenu,
    updateMenu,
    menuRole,
    giveMenuRole,

    login,
    logout,
    currentUser,

    allRole,
    menuRole,
    getRolePage,
    saveRole,
    removeRole,

    getUserPage,
    giveUserRole,
    updateUser,
    findUser,
    saveUser,
    freezeUser
}

const prefix = '/api';

const getUrl = function(name){
    return prefix + urlMap[name];
}

export default{
    getUrl
}