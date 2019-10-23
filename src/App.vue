<template>
  <div id="app">
    <Container>
      <Slider slot="slider"/>
      <Header slot="header"/>
    </Container>
  </div>
</template>
<script>
import Container from './components/layout/Container.vue'
import Slider from './components/layout/Slider.vue'
import Header from './components/layout/Header.vue'
export default {
  name: 'app',
  components: {
    Container,
    Slider,
    Header
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
