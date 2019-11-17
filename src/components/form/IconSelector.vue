<template>
  <div class="ui-fas">
    <el-input v-model="name" @input.native="filterIcons" suffix-icon="el-icon-search" placeholder="请输入图标名称"></el-input>
    <ul class="fas-icon-list">
      <li v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <i :class="[item]" />
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import iconList from '../../util/icons'
export default {
    name: 'IconSelector',
    data(){
        return {
            name: '',
            iconList: iconList
        }
    },
    methods:{
        filterIcons () {
            if (this.name) {
                this.iconList = this.iconList.filter(item => item.includes(this.name))
            } else {
                this.iconList = iconList
            }
        },
        selectedIcon (name) {
            this.$emit('selected', name)
        },
        reset () {
            this.name = ''
            this.iconList = iconList
        }
    }
}
</script>