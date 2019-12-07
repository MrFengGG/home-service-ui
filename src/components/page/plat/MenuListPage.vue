<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="菜单名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="菜单组">
                        <el-select v-model = "form.groupCode" @change="change">
                            <SelectorOption url="/api/menu/getAllGroup" dataName="groupName" dataCode="code"/>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4" :offset="6">
                    <el-button type="primary" @click="query">搜索</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="tableData" :tree-props="treeSet" row-key="id" border style="margin-bottom: 10px">
            <el-table-column v-for="head in tableHead" :prop="head.code" :key="head.code" :label="head.name"></el-table-column>
        </el-table>
        <el-pagination
            style="text-align: right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<style >
    .input-item{
        width : 90%
    }
    .inner-input{
        width : 100%
    } 
</style>
<script>
import SelectorOption from '../../form/SelectorOption'
export default {
    name: 'MenuListPage',
    components: {
        SelectorOption
    },
    data() {
        return {
            form: {
                name: '',
                groupCode: ''
            },
            tableData: [],
            pageNo: 1,
            pageSize: 10,
            total : 0,
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
            submitUrl: '/api/menu/pageQueryMenu'
        }  
    },
    created : function(){
        this.query();
    },
    methods : {
        query(){
            console.log(this.form)
            this.$requests.post(this.submitUrl, {
                ...this.form,
                pageNo : this.pageNo,
                pageSize : this.pageSize
            }).then(data =>{
                if(data.code > 0){
                    this.tableData = data.data.data;
                }
                this.total = data.data.total;
            })
        },
        handleSizeChange(pageSize){
            this.pageSize = pageSize;
            this.query();
        },
        handleCurrentChange(pageNo){
            this.pageNo = pageNo;
            this.query();
        },
        change(value){
            console.log(value);
        }
    }
}
</script>