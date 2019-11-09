<template>
    <el-cascader :options="options" :props="{ checkStrictly: true }" clearable></el-cascader>
</template>
<script>
export default {
    name: 'Casdacer',
    props: {
        dataUrl: {
            type: String,
            required: true
        },
        labelKey: {
            type: String,
            default: 'name'
        },
        valueKey: {
            type: String,
            default: 'code'
        },
        childrenKey: {
            type: String,
            default: 'childList'
        }
    },
    data(){
        return {
            options: []
        }
    },
    methods: {
        fetchOptions(){
            request.get(this.dataUrl).then(data =>{
                if(data.code > 0){
                    this.options = options;
                }
            });
        }
    },
    created(){
        fetchOptions();
    }
}
</script>