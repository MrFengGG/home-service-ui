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
import Container from './components/layout/Container.vue'
import TablePage from './components/page/TablePage'
import Slider from './components/layout/Slider.vue'
import Header from './components/layout/Header.vue'
export default {
  name: 'app',
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
