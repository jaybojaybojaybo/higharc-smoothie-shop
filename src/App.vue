<template>
  <Navbar></Navbar>
  <SmoothieList></SmoothieList>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import SmoothieList from './components/SmoothieList.vue'

export default {
  components: {
    Navbar,
    SmoothieList
  },
  setup() {
    onMounted(() => {
      console.log('smoothie shop is open!')
    })    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
