<template>
<div>
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.name"
        :value="item.value">
    </el-option>
</div>
</template>
<script>
export default {
    name: 'SelectorOption',
    data: function(){
        return {
            options: []
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
        }
    },
    created: function(){
        this.$requests.get(this.url).then(data =>{
            if(data.code > 0){
              this.options = data.data.map(option => {
                  return {name: option[this.dataName], value: option[this.dataCode]};
                });
                console.log(this.options)
            }
          });
    }
}
</script>