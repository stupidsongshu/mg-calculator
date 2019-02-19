<template>
  <div class="home-wrapper">
    <lt-header :title="'乐一贷'" :showBackBtn="'0'"></lt-header>
    <tab-nav :active="'false'"></tab-nav>
    <div class="content">
      <div class="action-wrapper">
        <div class="action-content">
          <div class="content-item textC">
            <p class="content-value">{{instrest}}&nbsp;</p>
            <p class="content-title">利息（元）</p>
          </div>
          <div class="content-item">
            <p class="content-value">{{total}}&nbsp;</p>
            <p class="content-title">本息合计（元）</p>
          </div>
        </div>
      </div>
      <div class="result-wrapper">
        <div class="select-item">
          <span class="select-item-title">存款金额</span>
          <span class="select-item-result"><input type="number" placeholder="请输入存款金额" v-model="ammount" @keyup="amountFormatter" @keydown="amountFormatter" oninput="value=value.replace(/[^0-9]/g,'')">元</span>
        </div>
        <div class="select-item">
          <span class="select-item-title">存款利率</span>
          <span class="select-item-result"><input type="number" placeholder="请输入存款利率" v-model="rate" @keyup="rateFormatter" @keydown="rateFormatter">%</span>
        </div>
        <div class="select-item" @click="togglePopup">
          <span class="select-item-title">存款周期</span>
          <span class="select-item-result hasMore">{{yearsText}}</span>
        </div>
        <div class="select-item" v-show="yearsValue == 0">
          <span class="select-item-title">活期月数</span>
          <span class="select-item-result"><input type="number" placeholder="请输入活期存款周期" v-model="months" @keyup="monthsFormatter" @keydown="monthsFormatter" oninput="value=value.replace(/[^0-9]/g,'')">个月</span>
        </div>
      </div>
      <button class="btn" @click="caculate">计算</button>
    </div>
    <mt-popup
      class="popupContainer"
      v-model="popupVisible"
      popup-transition="popup-slide"
      position="bottom"
      modal="true"
      closeOnClickModal=false>
      <div class="picker-nav">
        <div class="cancel-btn" @click="togglePopup">取消</div>
        <div>存款周期</div>
        <div class="ensure-btn" @click="ensure">确定</div>
      </div>
      <mt-picker :slots="list" @change="onChange" :visible-item-count="5" value-key="name"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import TabNav from '@/components/TabNav'
import LtHeader from '@/components/Head'
export default {
  data () {
    return {
      instrest: '0.00',
      total: '0.00',
      ammount: '', // 输入的存款金额
      rate: '', // 输入的存款利率
      yearsValue: '0', // 存款周期
      yearsText: '活期', // 存款周期
      months: '', // 活期存款月数
      tempYearsValue: '',
      tempYearsText: '',
      popupVisible: false,
      list: [{
        flex: 1,
        values: [
          {
            id: '0',
            name: '活期'
          },
          {
            id: '3',
            name: '3个月定期'
          },
          {
            id: '6',
            name: '6个月定期'
          },
          {
            id: '12',
            name: '1年定期'
          },
          {
            id: '24',
            name: '2年定期'
          },
          {
            id: '36',
            name: '3年定期'
          }
        ],
        className: 'slot1'
      }]
    }
  },
  components: {
    TabNav,
    LtHeader
  },
  watch: {
    '$route' (next, old) {
      // console.log('old:', old)
      // console.log()
      // console.log('next:', next)
      // if ((old === undefined || old.name === 'financial') && next.name === 'Home') {
      //   console.log(1)
      //   this.$router.replace('/')
      // }
    },
    ammount (val) {
      this.instrest = '0.00'
      this.total = '0.00'
    },
    rate (val) {
      this.instrest = '0.00'
      this.total = '0.00'
    },
    yearsValue (val) {
      this.instrest = '0.00'
      this.total = '0.00'
    },
    months (val) {
      this.instrest = '0.00'
      this.total = '0.00'
    }
  },
  methods: {
    amountFormatter () {
      if (this.ammount.length > 10) {
        this.ammount = this.ammount.substr(0, 10)
      }
    },
    rateFormatter () {
      var value = parseFloat(this.rate)
      if (value > 10) {
        this.rate = this.rate.substr(0, 1)
      }
      if (this.rate.length > 4) {
        this.rate = this.rate.substr(0, 4)
      }
    },
    monthsFormatter () {
      if (this.months.length > 4) {
        this.months = this.months.substr(0, 4)
      }
    },
    togglePopup () {
      this.popupVisible = !this.popupVisible
    },
    ensure () {
      this.popupVisible = !this.popupVisible
      this.yearsValue = this.tempYearsValue
      this.yearsText = this.tempYearsText
    },
    onChange (picker, values) {
      this.tempYearsValue = values[0].id
      this.tempYearsText = values[0].name
    },
    caculate () {
      if (this.ammount === '' || this.rate === '' || (this.yearsValue === '0' && this.months === '')) {
        return
      }
      // 活期存款利息计算
      // 利息 = 存款 * 利率 * 存款时间 / 360
      if (parseInt(this.yearsValue) === 0) {
        this.instrest = Math.round(this.ammount * this.rate * (this.months * 30 / 360)) / 100
        this.total = parseFloat(this.ammount) + parseFloat(this.instrest)
      } else {
        // 定期存款
        // 利息 = 存款 * 年数 * 利率
        this.instrest = Math.round(this.ammount * this.rate * this.yearsValue / 12) / 100
        this.total = parseFloat(this.ammount) + parseFloat(this.instrest)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home-wrapper{
  position: relative;
  width: 100%;
  height: 100%;
  .content{
    position: relative;
    padding-top: 10.5rem;
    padding-bottom: 5rem;
    min-height: 100%;
    box-sizing: border-box;
    background: #F1F1F1;
    .action-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 5rem 1rem 2rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background: url(../assets/image/bg.png) no-repeat 0 0 / 100% 100%;
      .tabs{
        width: 50%;
        margin: 0 auto;
        margin-bottom: 1rem;
        font-size: .8rem;
        border: 1px solid #fff;
        border-radius: 1rem;
        zoom: 1;
        &:after{
          display: block;
          content: '';
          clear: both;
        }
        .tab-item{
          float: left;
          width: 50%;
          height: 1.8rem;
          line-height: 2rem;
          background: #5383E8;
          color: #d9d9d9;
          &:first-child{
            border-top-left-radius: 1rem;
            border-bottom-left-radius: 1rem;
          }
          &:last-child{
            border-top-right-radius: 1rem;
            border-bottom-right-radius: 1rem;
          }
        }
        .activeTab{
          background: #fff;
          color: #5383E8;
        }
      }
      .action-content{
        zoom: 1;
        color: #fff;
        &:after{
          display: block;
          content: '';
          clear: both;
        }
        .content-item{
          float: left;
          width: 50%;
          text-align: left;
          margin-top: .5rem;
          &:last-child{
            padding-left: 1rem;
            box-sizing: border-box;
          }
          .content-title{
            font-size: .7rem;
          }
          .content-value{
            font-family: sans-serif;
            font-size: 1.6rem;
          }
        }
        .textC{
          text-align: center;
        }
      }
    }
    .result-wrapper{
      background: #fff;
      .select-item{
        width: 90%;
        padding: .8rem 5%;
        position: relative;
        zoom: 1;
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
          input{
            width: 70%;
            border: none;
            -webkit-tap-highlight-color: transparent;
            text-align: right;
            font-size: .9rem;
            padding-right: .4rem;
            outline: none;
          }
        }
        .hasMore{
          width: 54%;
          padding-right: 6%;
          position: relative;
          &:after, &:before{
            border: 10px solid transparent;
            border-left: 10px solid #fff;
            width: 0;
            height: 0;
            position: absolute;
            top: 0;
            right: -0.5rem;
            content: ' '
          }
          &:before{
            border-left-color: #cdcdcd;
            right: -0.58rem;
          }
        }
      }
    }
  }
}
.btn{
  width: 80%;
  margin: 1rem auto;
  border: none;
  background: -webkit-linear-gradient(127deg, #5A8DE9,#5A8DE9, #5F7AF1,#675BFD,#6857FF);
  background: -moz-linear-gradient(127deg, #5A8DE9,#5A8DE9, #5F7AF1,#675BFD,#6857FF);
  background: -o-linear-gradient(127deg, #5A8DE9,#5A8DE9, #5F7AF1,#675BFD,#6857FF);
  background: linear-gradient(127deg, #5A8DE9,#5A8DE9, #5F7AF1,#675BFD,#6857FF);
  color: #fff;
  height: 3rem;
  -webkit-border-radius: 2rem;
  -moz-border-radius: 2rem;
  -o-border-radius: 2rem;
  border-radius: 2rem;
  font-size: 1rem;
  -webkit-box-shadow: 0 3px 6px 0 #A2B0F8;
  -moz-box-shadow: 0 3px 6px 0 #A2B0F8;
  -o-box-shadow: 0 3px 6px 0 #A2B0F8;
  box-shadow: 0 3px 6px 0 #A2B0F8;
  outline: none;
  -webkit-tap-highlight-color: transparent
}
.popupContainer {
  width: 100%;
  .picker-nav{
    padding: .5rem 0;
    border-bottom: 1px solid #f1f1f1;
    background: #f1f1f1;
    zoom: 1;
    &:after{
      display: block;
      content: '';
      clear: both;
    }
    div{
      float: left;
      width: 60%;
    }
    .cancel-btn, .ensure-btn{
      width: 20%;
      color: #5383E8;
    }
  }
}
</style>

