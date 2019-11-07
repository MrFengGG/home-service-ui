<template>
    <div>
        <el-form :model="formInline" label-width="130px">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="审批人" class="input-item">
                        <el-input v-model="formInline.user" placeholder="审批人"  class="inner-input"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="活动区域" class="input-item">
                        <el-select v-model="formInline.region" placeholder="活动区域" class="inner-input">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="审批人士大夫但是" class="input-item">
                        <el-input v-model="formInline.user" placeholder="审批人" class="inner-input"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="活动区域" class="input-item">
                        <el-select v-model="formInline.region" placeholder="活动区域"  class="inner-input">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="query" style="margin-left:70%">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" :tree-props="treeSet" row-key="id" border>
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
import request from '../../util/request'
export default {
    props : {
        submitUrl:{
            type: String
        },
        queryItem : {
            type: Array
        },
        tableHead : {
            type: Array
        },
        treeSet : {
            type: Object
        }
    },
    name: 'TablePage',
    pageName: '通用数据列表',
    data() {
        return {
            formInline: {
            
            },
            tableData: [],
            pageNo : 1,
            pageSize : 10,
            total : 0,
        }  
    },
    created : function(){
        this.query();
    },
    methods : {
        query(){
            request.post(this.submitUrl, {
                ...this.formInline,
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
        }
    }

}
</script>