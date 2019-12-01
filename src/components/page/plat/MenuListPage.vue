<template>
    <TablePage :submitUrl="submitUrl" :tableHead="tableHead" :treeSet="treeSet" :rule="rule"/>
</template>
<script>
import TablePage from '../common/TablePage'
export default {
    name: 'MenuListPage',
    components: {
        TablePage
    },
    data(){
        return {
            submitUrl: '/api/menu/pageQueryMenu',
            tableHead: [
                {
                    code: 'id',
                    name: 'ID'
                },{
                    code: 'code',
                    name: '菜单代码'
                },{
                    code: 'menuType',
                    name: '菜单类型'
                },{
                    code: 'menuGroupCode',
                    name: '所属菜单组'
                },{
                    code: 'icon',
                    name: '图标'
                },{
                    code: 'menuName',
                    name: '菜单名称'
                },{
                    code: 'menuPath',
                    name: '菜单路径'
                },{
                    code: 'createTime',
                    name: '创建时间'
                },{
                    code: 'menuDesc',
                    name: '备注'
                },{
                    code: 'priority',
                    name: '优先级'
                },{
                    code: 'needRoles',
                    name: '可访问角色'
                }
            ],
            treeSet: {
                children: 'childList'
            },
            rule:[{
                    type: 'el-row',
                    native: true,
                    children: [{
                            type:'input',
                            field:'menuName',
                            title:'菜单名称',
                            col:{
                                span: 10
                            }
                        },{
                            type:'DatePicker',
                            field:'created_at',
                            title:'创建时间',
                            col:{
                                span:10
                            },
                            props: {
                                type: 'datetimerange',
                                rangeSeparator: '至'
                            }
                        }]
                    }]
        }
    }
}
</script>