<template>
    <div>
        <form-create v-model="fApi" :rule="rule" :option="option"></form-create>
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
export default {
    props : {
        submitUrl:{
            type: String,
            required: true
        },
        tableHead : {
            type: Array,
            required: true
        },
        treeSet : {
            type: Object
        },
        rule: {
            type: Array
        }
    },
    name: 'TablePage',
    data() {
        return {
            formInline: {
            
            },
            tableData: [],
            pageNo : 1,
            pageSize : 10,
            total : 0,
            fApi:{
                submitBtn: {
                    col: {
                        span: 4
                    }
                }
            },
            option:{
                submitBtn: false,
                resetBtn: false
            },
        }  
    },
    created : function(){
        this.query();
    },
    methods : {
        query(){
            this.$requests.post(this.submitUrl, {
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
    },
    computed: {
        rowFormItem:function(){
            let rowItem = [];
            for(item in this.queryItem){
                
            }
            return rowItem;
        }
    }

}
</script>