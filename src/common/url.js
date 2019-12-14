//menu
const userMenuList = '/menu/get_user_menu';

const allMenuList = '/menu/query';

const menuDetail = '/menu/find_by_id';

const menuGroupList = '/menu/get_menu_groups';

const saveMenu = 'menu/save_or_update'

//sys
const login = '/auth/access_token'

const logout = '/auth/clear_token'

const currentUser = '/auth/check_token'

const urlMap = {
    userMenuList,
    allMenuList,
    menuDetail,
    menuGroupList,
    saveMenu,

    login,
    logout,
    currentUser
}

const prefix = '/api';

const getUrl = function(name){
    return prefix + urlMap[name];
}

export default{
    getUrl
}