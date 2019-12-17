<template>
<div>
    <el-select placeholder="请选择" @change="update" v-model="selectValue">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.name"
        :value="item.value">
        </el-option>
  </el-select>
</div>
</template>
<script>
export default {
    name: 'DataSelector',
    model: {
        prop: 'value',
        event: 'select'
    },
    data: function(){
        return {
            options: [],
            selectValue: ''
        }
    },
    props:{
        url: {
            type: String,
            required: true
        },
        dataName: {
            type: name,
            default: 'name'
        },
        dataCode: {
            type: String,
            default: 'code'
        },
        value: {
            type: String
        },
        initValue: {
            type: String,
            default: ''
        }
    },
    created: function(){
        this.$requests.get(this.url).then(data =>{
            if(data.code > 0){
              this.options = data.data.map(option => {
                  return {name: option[this.dataName], value: option[this.dataCode]};
                });
                this.selectValue = this.initValue;
            }
          });
    },
    methods: {
        update: function(value){
            this.$emit('select', value);
        }
    },
    watch: {
        initValue(value){
            this.value = value;
        }
    }
}
</script>