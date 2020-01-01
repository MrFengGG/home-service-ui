<template>
    <el-button :type="type" @click="open" :size="size">{{ name }}</el-button>
</template>
<script>
export default {
    name: 'ConfirmBtn',
    props: {
        url:{
            type: String,
            default: ''
        },
        customerOperate: {
            type: Function,
            default: null
        },
        name: {
            type: String,
            required: true
        },
        confirmText: {
            type: String,
            required: true
        },
        confirmButtonText: {
            type: String,
            default: '确定'
        },
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        data: {
            type: Object,
            default: {}
        },
        size: {
            type: String,
            default: 'medium'
        },
        type: {
            type: String,
            default: 'primary'
        },
        afterSuccess: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        open() {
            this.$confirm(this.confirmText, '提示', {
                confirmButtonText: this.confirmButtonText,
                cancelButtonText: this.cancelButtonText,
                type: 'warning'
            }).then(() => {
                this.operate();
            }).catch(() => {});
        },
        operate: function(){
            if(this.customerOperate){
                this.customerOperate();
            }else{
                this.$requests.post(this.url, this.data).then(data =>{
                    if(data.code > 0){
                        this.afterSuccess();
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: data.msg || '操作失败',
                            type: 'error'
                        });
                    }
                })
            }
        }
    }
}
</script>