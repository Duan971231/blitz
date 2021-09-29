<template>
  <div id="app">
    <div id="index_title">
    </div>
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media (max-width: 576px) {
  #index_title {
    background-color: #00F;
    height: 60px;
  }
}
@media (min-width: 577px) and (max-width: 768px) {
  #index_title {
    height: 60px;
    background-color: #0F0;
  }
}
@media (min-width: 767px) and (max-width: 992px) {
  #index_title {
    height: 60px;
    background-color: #F00;
  }
}
@media (min-width: 993px) and (max-width: 1200px) {
    #index_title {
    height: 60px;
      background-color: #FFF;
  }
}
@media  (min-width: 1200px) {
  #index_title {
    height: 60px;
    background-color: #000;
  }
}



#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
