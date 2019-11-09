<template>
    <el-select v-model="form.region" placeholder="请选择菜单组件">
        <el-option v-for="component in components" :label="component.name" :key="component.code" :value="component.code"></el-option>
    </el-select>
</template>
<script>
export default {
    name: 'Selector',
    props: {
        dataUrl: {
            type: String,
            required: true
        },
        labelKey: {
            type: String,
            default : 'name'
        },
        valueKey: {
            type: String,
            default : 'code'
        }
    },
    data(){
        return {
            options: []
        }
    },
    methods: {
        fetchOptions(){
            request.get(this.menuUrl).then(data =>{
                if(data.code > 0){
                    let options = data.data.map(option => {
                        return {
                            code : option[this.valueKey],
                            name : option[this.labelKey]
                        }
                    });
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