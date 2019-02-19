<template>
  <div class="fund-wrapper">
    <lt-header :title="'商业利率'" :url="'/'" :showBackBtn="'1'"></lt-header>
    <div class="select-item">
      <span class="select-item-title">自定义利率：</span>
      <span class="select-item-result"><input type="tel" v-model="definedSelf" @blur="goBack" oninput="value=value.replace(/[^0-9]/g,'')" @keyup="rateFormatter" @keydown="rateFormatter">%</span>
    </div>
    <p>常用利率</p>
    <div class="select-item" @click="selectRate(0)">
      <span class="select-item-title">7折</span>
      <span class="select-item-result">
        <i v-show="selected[0].selected" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
    <div class="select-item" @click="selectRate(1)">
      <span class="select-item-title">7.5折</span>
      <span class="select-item-result">
        <i v-show="selected[1].selected" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
    <div class="select-item" @click="selectRate(2)">
      <span class="select-item-title">8折</span>
      <span class="select-item-result">
        <i v-show="selected[2].selected" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
    <div class="select-item" @click="selectRate(3)">
      <span class="select-item-title">8.5折</span>
      <span class="select-item-result">
        <i v-show="selected[3].selected" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
    <div class="select-item" @click="selectRate(4)">
      <span class="select-item-title">9折</span>
      <span class="select-item-result">
        <i v-show="selected[4].selected" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
    <div class="select-item" @click="selectRate(5)">
      <span class="select-item-title">9.5折</span>
      <span class="select-item-result">
        <i v-show="selected[5].selected" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
    <div class="select-item" @click="selectRate(6)">
      <span class="select-item-title">基准利率（4.90%）</span>
      <span class="select-item-result">
        <i v-show="selected[6].selected" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
    <div class="select-item" @click="selectRate(7)">
      <span class="select-item-title">1.1倍</span>
      <span class="select-item-result">
        <i v-show="selected[7].selected" class="fa fa-check-circle" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</template>
<script>
import LtHeader from '@/components/Head'
export default {
  data () {
    return {
      definedSelf: '4.90',
      definedSelfChange: false,
      selected: [
        {selected: false, value: 0.7},
        {selected: false, value: 0.75},
        {selected: false, value: 0.8},
        {selected: false, value: 0.85},
        {selected: false, value: 0.9},
        {selected: false, value: 0.95},
        {selected: false, value: 1},
        {selected: false, value: 1.1}
      ]
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
    selectRate (n) {
      var _this = this
      this.selected.forEach(function (item, index, arr) {
        if (index === n) {
          arr[index].selected = true
          var rate = (arr[index].value * 4.9).toFixed(2)
          _this.$store.commit('saveBusinessRate', rate)
        } else {
          arr[index].selected = false
        }
      })
      _this.back()
    },
    goBack () {
      this.$store.commit('saveBusinessRate', this.definedSelf)
      this.back()
    },
    back (type) {
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
  padding-top: 5.5rem;
  background: #F1F1F1;
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
      color: #5A8DE9;
      input{
        border: none;
        -webkit-tap-highlight-color: transparent;
        text-align: right;
        font-size: .9rem;
        padding-right: .4rem;
        color: #5A8DE9;
        outline: none;
      }
    }
  }
}
</style>

