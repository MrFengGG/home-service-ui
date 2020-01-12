<template>
    <div>
        <el-form ref="form" label-width="80px" slot="slider">
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-form-item label="用户名">
                        <el-input v-model="form.menuName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="手机">
                        <el-input v-model="form.menuPath"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-form-item label="生日">
                    <el-date-picker
                        v-model="form.createTimeTuple"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
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
        <el-table :data="tableData" :tree-props="treeSet" row-key="id" border style="margin-top: 20px">
            <el-table-column v-for="head in tableHead" :prop="head.code" :key="head.code" :label="head.name"></el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <confirmButton :data="{menuCode: scope.row['code']}" confirmText="确认删除吗?" name="删除" size="mini" type="danger" :url="menuRemoveUrl" :afterSuccess="query"/>
                    <el-button size="mini" @click="dialogVisible = true">权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="赋权"
            :visible.sync="dialogVisible"
            width="35%"
            :before-close="handleClose">
            <el-transfer v-model="value" :data="chooseRoleList" :titles="['可用权限', '已有权限']"></el-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
import DataSelector from '../../../form/DataSelector'
import confirmButton from '../../../common/ConfirmButton'
export default {
    name: 'UserListPage',
    components: {
        DataSelector,
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
                    code: 'username',
                    name: '用户名'
                },{
                    code: 'real_name',
                    name: '姓名'
                },{
                    code: 'nick_name',
                    name: '昵称'
                },{
                    code: 'mobile',
                    name: '手机号'
                },{
                    code: 'email',
                    name: '邮箱'
                },{
                    code: 'head_image',
                    name: '头像'
                },{
                    code: 'birthday',
                    name: '生日'
                },{
                    code: 'last_login_time',
                    name: '上次登录时间'
                },{
                    code: 'status',
                    name: '帐号状态'
                }
            ],
            dialogVisible: false,
            submitUrl: this.$url.getUrl('allMenuList'),
            menuGroupUrl: this.$url.getUrl('menuGroupList'),
            menuRemoveUrl: this.$url.getUrl('removeMenu'),
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
                    this.tableData = data.data;
                }
                this.total = data.total;
            })
        },
        jumpToEdit(){
            this.$router.push({path: "/plat/menu/edit"});
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
            this.$router.push({path: "/plat/menu/edit", query: {
                menuId: row.id
            }})
        }
    }
}
</script>