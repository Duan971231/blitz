<template>
  <div id="app">
    <div id="index_top">
      <Top></Top>
    </div>
    <div id="index_center">
      <router-view></router-view>
    </div>
    <div id="index_bottom">

    </div>
  </div>
</template>

<script lang="ts">
import Top  from './components/top.vue'
export default {
  components:{
    Top
  }
}

</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  background-color: #E9EAED;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
// 

</style>
