<template>
  <div id="app">
    <Container/>
  </div>
</template>

<script>
import Container from './components/Container.vue'

export default {
  name: 'app',
  components: {
    Container
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
