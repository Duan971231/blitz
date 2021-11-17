<template>
  <div id="app">
    <div id="index_top">
      <Top></Top>
    </div>
    <div id="index_center">
      <router-view></router-view>
    </div>
    <div id="index_bottom">
      <Footer></Footer>
    </div>
  </div>
</template>


<script lang="ts">
import Top  from './components/top.vue';
import Footer from './components/footer.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Top, Footer
  },
})
export default class App extends Vue {}
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
@media (min-width: 0px) {
  #index_center {
    max-width: 1200px;
    margin: 70px auto 20px auto;
    padding: 0 10px;
  }
  #index_bottom {
    width: 100%;

  }
}
@media (min-width: 576px) {      

}
@media (min-width: 768px) {
        
}
@media  (min-width: 992px) {

}
@media (min-width: 1200) {
  #index_center {
    padding: 0;
  }
}

// 

</style>
