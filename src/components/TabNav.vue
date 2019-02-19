<template>
  <div class="tab-wrapper">
    <div class="tab-item" :class="{'active': active === 'true'}" @click="gotoHome"><span class="icon icon-home"></span>房贷计算</div>
    <div class="tab-item" :class="{'active': active !== 'true'}" @click="gotoFinancial"><span class="icon icon-bank"></span>存款计算</div>
  </div>
</template>
<script>
export default {
  props: ['active'],
  data () {
    return {
    }
  },
  methods: {
    gotoHome () {
      this.$store.commit('saveLocalPopState', true)
      this.$router.replace('/')
    },
    gotoFinancial () {
      this.$store.commit('saveLocalPopState', true)
      this.$router.replace('/financial')
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-wrapper{
  width: 100%;
  height: 3rem;
  zoom: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: #fff;
  border-top: 1px solid #d9d9d9;
  color: #999;
  &:after{
    content: '';
    display: block;
    clear: both;
  }
  .tab-item{
    float: left;
    width: 50%;
    height: 100%;
    line-height: 3rem;
    -webkit-tap-highlight-color: transparent;
    .icon{
      display: inline-block;
      width: 16%;
      height: 100%;
      vertical-align: top;
      &.icon-home{
        background: url(../assets/image/icon_1_nor.png) no-repeat center 44% / auto 40%;
      }
      &.icon-bank{
        background: url(../assets/image/icon_2_nor.png) no-repeat center 48% / auto 40%;
      }
    }
  }
  .active{
    color: #5A8DE9;
    font-weight: bold;
    .icon{
      &.icon-home{
        background: url(../assets/image/icon_1_click.png) no-repeat center 44% / auto 40%;
      }
      &.icon-bank{
        background: url(../assets/image/icon_2_click.png) no-repeat center 48% / auto 40%;
      }
    }
  }
}
</style>


