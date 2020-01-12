<template>
    <div>
        <el-form ref="form" label-width="80px" slot="slider">
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-form-item label="角色代码">
                        <el-input v-model="form.roleName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="角色名称">
                        <el-input v-model="form.menuPath"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="16">
                    <el-button type="primary" @click="query" style="margin-left:10%">搜索</el-button>
                    <el-button type="primary" @click="jumpToEdit" style="margin-left:1%">新建</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="tableData" row-key="id" border style="margin-top: 20px">
            <el-table-column v-for="head in tableHead" :prop="head.code" :key="head.code" :label="head.name"></el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <confirmButton :data="{menuCode: scope.row['code']}" confirmText="确认删除吗?" name="删除" size="mini" type="danger" :url="menuRemoveUrl" :afterSuccess="query"/>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style >
    .input-item{
        width : 90%
    }
    .inner-input, .el-select{
        width : 100%
    }
    div.el-range-editor{
        width: 100% !important
    }
</style>
<script>
import confirmButton from '../../../common/ConfirmButton'
export default {
    name: 'RoleListPage',
    components: {
        confirmButton
    },
    data() {
        return {
            form: {
            },
            allRoleList: [],
            chooseRoleList: [],
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
                    name: '角色代码'
                },{
                    code: 'role_name',
                    name: '角色名称'
                },{
                    code: 'role_desc',
                    name: '详情'
                },{
                    code: 'create_time',
                    name: '创建时间'
                }
            ],
            dialogVisible: false,
            submitUrl: this.$url.getUrl('getRolePage'),
            roleListUrl: this.$url.getUrl('allRole')
        }  
    },
    created : function(){
        this.query();
    },
    methods : {
        query(){
            this.$requests.get(this.submitUrl, {
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
        jumpToEdit(){
            //todo 创建角色
        },
        handleSizeChange(pageSize){
            this.pageSize = pageSize;
            this.query();
        },
        handleCurrentChange(pageNo){
            this.pageNo = pageNo;
            this.query();
        },
        handleEdit(index, row) {
            //todo 编辑角色
        }
    }
}
</script>