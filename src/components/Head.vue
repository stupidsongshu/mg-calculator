<template>
  <div class="head-wrapper">
    <div class="head-title">{{title}}</div>
    <span class="back" @click="goback" v-if="isShowBackBtn"></span>
  </div>
</template>
<script>
export default {
  props: ['title', 'url', 'showBackBtn'],
  data () {
    return {
    }
  },
  computed: {
    isShowBackBtn () {
      if (this.showBackBtn === '0') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    goback () {
      if (this.url !== '' && this.url !== null) {
        this.$router.replace(this.url)
        this.$router.back()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.head-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  zoom: 1;
  z-index: 110;
  width: 100%;
  height: 3rem;
  padding-top: 1.5rem;
  color: #5A8DE9;
  background: #fff;
  font-size: 1.2rem;
  &:after{
    content: '';
    display: block;
    clear: both;
  }
  .head-title{
    width: 100%;
    height: 100%;
    line-height: 3rem;
    background: transparent;
  }
  .back{
    display: inline-block;
    width: 3rem;
    height: 3rem;
    position: absolute;
    bottom: 0;
    left: 0;
    &:after, &:before{
      border: 10px solid transparent;
      border-right: 10px solid #fff;
      width: 0;
      height: 0;
      position: absolute;
      top: 32%;
      left: -0.5rem;
      margin-left: 1rem;
      content: ' '
    }
    &:before{
      border-right-color: #453B36;
      left: -0.58rem;
    }
  }
}
</style>

