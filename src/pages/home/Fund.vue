<template>
  <div class="fund-wrapper">
    <lt-header :title="'公积金利率'" :url="'/'" :showBackBtn="'1'"></lt-header>
    <div class="select-item">
      <span class="select-item-title">自定义利率：</span>
      <span class="select-item-result"><input type="tel" v-model="definedSelf" @blur="goBack" oninput="value=value.replace(/[^0-9]/g,'')" @keyup="rateFormatter" @keydown="rateFormatter">%</span>
    </div>
    <p>常用利率</p>
    <div class="select-item" @click="selectRate(1)">
      <span class="select-item-title">基准利率（3.25%）</span>
      <span class="select-item-result">
        <i v-show="selected1" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
    <div class="select-item" @click="selectRate(2)">
      <span class="select-item-title">1.1倍</span>
      <span class="select-item-result">
        <i v-show="selected2" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</template>
<script>
import LtHeader from '@/components/Head'
export default {
  data () {
    return {
      definedSelf: 3.25,
      definedSelfChange: false,
      selected1: false,
      selected2: false
    }
  },
  components: {
    LtHeader
  },
  watch: {
    definedSelf (val, old) {
      this.definedSelfChange = true
    }
  },
  methods: {
    rateFormatter () {
      var value = parseFloat(this.definedSelf)
      if (value > 10) {
        this.definedSelf = this.definedSelf.substr(0, 1)
      }
      if (this.definedSelf.length > 4) {
        this.definedSelf = this.definedSelf.substr(0, 4)
      }
    },
    selectRate (val) {
      if (parseInt(val) === 1) {
        this.selected1 = true
        this.selected2 = false
        this.$store.commit('saveFundRate', '3.25')
      } else {
        this.selected1 = false
        this.selected2 = true
        var rate = 3.25 * 1.1
        this.$store.commit('saveFundRate', rate)
      }
      this.back()
    },
    goBack () {
      this.$store.commit('saveFundRate', this.definedSelf)
      this.back()
    },
    back () {
      var _this = this
      setTimeout(function () {
        _this.$router.replace('/')
        _this.$router.back()
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.fund-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 110;
  width: 100%;
  height: 100%;
  background: #F1F1F1;
  padding-top: 5.5rem;
  p{
    text-align: left;
    font-size: .7rem;
    padding: .5rem 0;
    padding-left: 1.2rem;
    color: #666;
  }
  .select-item{
    width: 90%;
    padding: .8rem 5%;
    background: #fff;
    position: relative;
    zoom: 1;
    &:first-child{
      margin-top: 1rem;
    }
    &:after{
      content: '';
      display: block;
      clear: both;
    }
    &:before{
      display: block;
      content: '';
      height: 1px;
      width: 100%;
      background: #efefef;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    span{
      white-space: nowrap;
      float: left;
      font-size: .9rem;
      color: #333;
    }
    .select-item-title{
      width: 40%;
      text-align: left;
    }
    .select-item-result{
      width: 60%;
      text-align: right;
      color: #453B36;
      input{
        border: none;
        -webkit-tap-highlight-color: transparent;
        text-align: right;
        font-size: .9rem;
        padding-right: .4rem;
        color: #5383E8;
        outline: none;
      }
    }
  }
}
</style>

