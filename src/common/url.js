//menu
const userMenuList = '/menu/get_user_menu';
const allMenuList = '/menu/query';
const menuDetail = '/menu/find_by_id';
const menuGroupList = '/menu/get_menu_groups';
const saveMenu = 'menu/save'
const updateMenu = 'menu/update'
const removeMenu = 'menu/remove'

//sys
const login = '/auth/access_token'
const logout = '/auth/clear_token'
const currentUser = '/auth/check_token'

//role
const allRole = '/role/get_all'
const menuRole = 'role/get_menu_role_list'
const getRolePage = '/role/pagination_query'
const saveRole = '/role/save'

//user
const getUserPage = '/user/paginationQuery'
const giveUserRole = '/user/give_role'
const updateUser = '/user/update'
const saveUser = '/user/save'
const freezeUser = '/user/freeze'

const urlMap = {
    userMenuList,
    allMenuList,
    menuDetail,
    menuGroupList,
    saveMenu,
    removeMenu,
    updateMenu,

    login,
    logout,
    currentUser,

    allRole,
    menuRole,
    getRolePage,
    saveRole,

    getUserPage,
    giveUserRole,
    updateUser,
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