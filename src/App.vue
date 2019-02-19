<template>
  <div id="app" name="slide">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  /* height: 40rem; */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.slide-enter-active, .slide-leave-active {
  transition: all .5s
}
.slide-enter, .slide-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  left: -100%
}
</style>
