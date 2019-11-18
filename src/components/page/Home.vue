<template>
  <div id="app">
    <Container>
      <Slider slot="slider"/>
      <Header slot="header"/>
      <el-card slot="main" style="min-height:100%">
        <router-view></router-view>
      </el-card>
    </Container>
  </div>
</template>
<script>
import Container from '../layout/Container.vue'
import TablePage from '../page/TablePage'
import Slider from '../layout/Slider.vue'
import Header from '../layout/Header.vue'
export default {
  name: 'Home',
  components: {
    Container,
    Slider,
    Header,
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>