<template>
    <el-cascader v-model="chooseValue" :options="options" :props="{ checkStrictly: checkStrictly, label: label, value: value, children: childName}" clearable @change="update"></el-cascader>
</template>
<script>
export default {
    name: 'CascaderSelector',
    model: {
        prop: 'selectValue',
        event: 'select'
    },
    props: {
        url: {
            type: String,
            required: true
        },
        checkStrictly: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: 'label'
        },
        value: {
            type: String,
            default: 'code'
        },
        childName: {
            type: String,
            default: 'childList'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        selectValue: {
            type: String
        },
        initValue: {
            type: String,
            default: ''
        }
    },
    data: function(){
        return {
            chooseValue: '',
            options: []
        }
    },
    created: function(){
        this.$requests.get(this.url).then(data =>{
            if(data.code > 0){
              this.options = data.data;
              this.chooseValue = this.initValue;
            }
          });
    },
    methods: {
        update: function(value){
            console.log(value)
            if(!this.multiple){
                value = value && value[value.length - 1];
            }
            this.$emit('select', value);
        }
    },
    watch: {
        initValue(value){
            this.selectValue = value;
        }
    }
}
</script>