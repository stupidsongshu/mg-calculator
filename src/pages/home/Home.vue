<template>
  <div class="home-wrapper">
    <lt-header :title="'乐贷款'" :showBackBtn="'0'"></lt-header>
    <tab-nav :active="'true'"></tab-nav>
    <div class="content">
      <div class="action-wrapper">
        <div class="tabs">
          <div class="tab-item" :class="{'activeTab': activeTab}" @click="toggleTabs(true)">等额本息</div>
          <div class="tab-item" :class="{'activeTab': !activeTab}" @click="toggleTabs(false)">等额本金</div>
        </div>
        <div class="action-content">
          <div class="content-item">
            
            <p class="content-value">{{paymentForEachMonth}}&nbsp;</p>
            <p class="content-title">参考月供（元）</p>
          </div>
          <div class="content-item" v-show="!activeTab">
            
            <p class="content-value">{{decreaseForEachMonth}}&nbsp;</p>
            <p class="content-title">逐月递减（元）</p>
          </div>
        </div>
        <div class="action-content">
          <div class="content-item">
            <p class="content-value">{{paymentForAll}}&nbsp;</p>
            <p class="content-title">还款总额（元）</p>
          </div>
          <div class="content-item">
            <p class="content-value">{{intrestForAll}}&nbsp;</p>
            <p class="content-title">支付利息（元）</p>
          </div>
        </div>
      </div>
      <div class="result-wrapper">
        <div class="select-item" @click="togglePopup1">
          <span class="select-item-title">贷款类型</span>
          <span class="select-item-result hasMore">{{loanTypeText}}</span>
        </div>
      </div>
      <div class="result-wrapper margB" v-show="loanType != 2">
        <div class="select-item">
          <span class="select-item-title">公积金贷款</span>
          <span class="select-item-result"><input id="fundAmount" type="number" placeholder="请输入贷款金额" oninput="value=value.replace(/[^0-9]/g,'')" v-model="fundAmount" @focus="atViewCenter" @keyup="fundAmountFormatter" @keydown="fundAmountFormatter">万元</span>
        </div>
        <div class="select-item" @click="togglePopup2(1)">
          <span class="select-item-title">贷款年限</span>
          <span class="select-item-result hasMore">{{fundYears}}年</span>
        </div>
        <div class="select-item" @click="gotoFundPage">
          <span class="select-item-title">公积金利率</span>
          <span class="select-item-result hasMore">{{fundRate}}%</span>
        </div>
      </div>
      <div class="result-wrapper" v-show="loanType != 1">
        <div class="select-item">
          <span class="select-item-title">商业贷款</span>
          <span class="select-item-result"><input type="number" placeholder="请输入贷款金额" v-model="businessAmount" @keyup="businessAmountFormatter" @keydown="businessAmountFormatter" oninput="value=value.replace(/[^0-9]/g,'')">万元</span>
        </div>
        <div class="select-item" @click="togglePopup2(2)">
          <span class="select-item-title">贷款年限</span>
          <span class="select-item-result hasMore">{{businessYears}}年</span>
        </div>
        <div class="select-item" @click="gotoBusinessPage">
          <span class="select-item-title">商贷利率</span>
          <span class="select-item-result hasMore">{{businessRate}}%</span>
        </div>
      </div>
      <button class="btn" @click="caculate">计算</button>
    </div>
    <mt-popup
      class="popupContainer"
      v-model="popupVisible1"
      popup-transition="popup-slide"
      position="bottom"
      modal="true"
      closeOnClickModal=false>
      <div class="picker-nav">
        <div class="cancel-btn" @click="togglePopup1">取消</div>
        <div>选择贷款类型</div>
        <div class="ensure-btn" @click="ensure1">确定</div>
      </div>
      <mt-picker :slots="list1" @change="onChange1" :visible-item-count="5" value-key="name"></mt-picker>
    </mt-popup>
    <mt-popup
      class="popupContainer"
      v-model="popupVisible2"
      popup-transition="popup-slide"
      position="bottom"
      modal="true"
      closeOnClickModal=false>
      <div class="picker-nav">
        <div class="cancel-btn" @click="togglePopup2">取消</div>
        <div>选择贷款年限</div>
        <div class="ensure-btn" @click="ensure2">确定</div>
      </div>
      <mt-picker :slots="list2" @change="onChange2" :visible-item-count="5" value-key="name"></mt-picker>
    </mt-popup>
    <router-view></router-view>
  </div>
</template>
<script>
import TabNav from '@/components/TabNav'
import LtHeader from '@/components/Head'
export default {
  data () {
    return {
      testTitle: '又一贷',
      activeTab: true,
      paymentForEachMonth: '0.00',
      decreaseForEachMonth: '0.00',
      paymentForAll: '0.00',
      intrestForAll: '0.00',
      // 选择贷款类型控件
      loanTypeText: '公积金贷款',
      loanType: 1,  // 2表示商业贷款，3表示组合贷款
      tempLoanTypeText: '公积金贷款',
      tempLoanType: 1,
      popupVisible1: false,
      list1: [{
        flex: 1,
        values: [
          {
            id: '1',
            name: '公积金贷款'
          },
          {
            id: '2',
            name: '商业贷款'
          },
          {
            id: '3',
            name: '组合贷款'
          }
        ],
        className: 'slot1'
      }],
      // 公积金贷款参数
      fundAmount: '',
      fundYears: '20',
      fundRate: '3.25',
      // 商业贷款参数
      businessAmount: '',
      businessYears: '20',
      businessRate: '4.90',
      // 选择年限控件
      yearType: 1, // 1表示公积金贷款年限，2表示商业贷款年限
      tempYears: '',
      popupVisible2: false,
      list2: [{
        flex: 1,
        values: [
          {
            id: '1',
            name: '1年'
          },
          {
            id: '2',
            name: '2年'
          },
          {
            id: '3',
            name: '3年'
          },
          {
            id: '4',
            name: '4年'
          },
          {
            id: '5',
            name: '5年'
          },
          {
            id: '6',
            name: '6年'
          },
          {
            id: '7',
            name: '7年'
          },
          {
            id: '8',
            name: '8年'
          },
          {
            id: '9',
            name: '9年'
          },
          {
            id: '10',
            name: '10年'
          },
          {
            id: '11',
            name: '11年'
          },
          {
            id: '12',
            name: '12年'
          },
          {
            id: '13',
            name: '13年'
          },
          {
            id: '14',
            name: '14年'
          },
          {
            id: '15',
            name: '15年'
          },
          {
            id: '16',
            name: '16年'
          },
          {
            id: '17',
            name: '17年'
          },
          {
            id: '18',
            name: '18年'
          },
          {
            id: '19',
            name: '19年'
          },
          {
            id: '20',
            name: '20年'
          },
          {
            id: '21',
            name: '21年'
          },
          {
            id: '22',
            name: '22年'
          },
          {
            id: '23',
            name: '23年'
          },
          {
            id: '24',
            name: '24年'
          },
          {
            id: '25',
            name: '25年'
          },
          {
            id: '26',
            name: '26年'
          },
          {
            id: '27',
            name: '27年'
          },
          {
            id: '28',
            name: '28年'
          },
          {
            id: '29',
            name: '29年'
          },
          {
            id: '30',
            name: '30年'
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
  methods: {
    atViewCenter (e) {
      console.log(e)
      // var fundAmountEl = document.getElementById('fundAmount')
      // fundAmount.scrollIntoView()
    },
    fundAmountFormatter () {
      if (this.fundAmount.length > 5) {
        this.fundAmount = this.fundAmount.substr(0, 5)
      }
    },
    businessAmountFormatter () {
      if (this.businessAmount.length > 5) {
        this.businessAmount = this.businessAmount.substr(0, 5)
      }
    },
    toggleTabs (val) {
      this.activeTab = val
      this.paymentForEachMonth = '0.00'
      this.decreaseForEachMonth = '0.00'
      this.paymentForAll = '0.00'
      this.intrestForAll = '0.00'
    },
    togglePopup1 () {
      // 切换贷款类型控件
      this.popupVisible1 = !this.popupVisible1
    },
    ensure1 () {
      this.popupVisible1 = !this.popupVisible1
      this.loanTypeText = this.tempLoanTypeText
      this.loanType = this.tempLoanType
    },
    onChange1 (picker, values) {
      this.tempLoanTypeText = values[0].name
      this.tempLoanType = values[0].id
    },
    togglePopup2 (type) {
      // 切换贷款年限
      if (type === 1) {
        this.yearType = 1
      } else {
        this.yearType = 2
      }
      this.popupVisible2 = !this.popupVisible2
    },
    ensure2 () {
      if (this.yearType === 1) {
        this.fundYears = this.tempYears
      } else {
        this.businessYears = this.tempYears
      }
      this.popupVisible2 = !this.popupVisible2
    },
    onChange2 (picker, values) {
      this.tempYears = values[0].id
    },
    gotoFundPage () {
      this.$store.commit('saveLocalPopState', true)
      this.$router.push('/home/fund')
    },
    gotoBusinessPage () {
      this.$store.commit('saveLocalPopState', true)
      this.$router.push('/home/business')
    },
    caculateFundLoan (type) {
      if (this.fundAmount === '') {
        return
      }
      var amount = parseFloat(this.fundAmount) * 10000 // 贷款金额
      var rate = parseFloat((parseFloat(this.fundRate) / 12 / 100).toFixed(5))  // 月利率
      var months = parseInt(this.fundYears) * 12  // 贷款月数
      var paymentForEachMonth = 0
      var paymentForAll = 0
      var intrestForAll = 0
      var decreaseForEachMonth = 0
      if (type === 1) {
        /**
         * 公积金贷款计算
         * （1）等额本息计算：
         * 每月月供 = ［贷款本金×月利率×（1＋月利率）＾还款月数］÷［（1＋月利率）＾还款月数－1]
         * 支付利息 = 还款月数×每月月供额-贷款本金
         * 还款总额
         */
        paymentForEachMonth = ([amount * rate * Math.pow((1 + rate), months)] / [Math.pow((1 + rate), months) - 1]).toFixed(2)
        paymentForAll = ((paymentForEachMonth * months) / 10000).toFixed(2)
        intrestForAll = ((months * paymentForEachMonth - amount) / 10000).toFixed(2)
        this.paymentForEachMonth = paymentForEachMonth
        this.paymentForAll = paymentForAll + '万'
        this.intrestForAll = intrestForAll + '万'
        return [paymentForEachMonth, paymentForAll, intrestForAll]
      } else {
        /**
         * 公积金贷款计算
         * （2）等额本金计算：
         * 首月月供 = (贷款本金÷还款月数)+贷款本金×月利率
         * 支付利息 = （还款月数＋1）×贷款额×月利率/2
         * 每月月供递减额 = 每月应还本金×月利率=贷款本金÷还款月数×月利率
         * 还款总额＝（还款月数＋1）＊贷款额＊月利率／2＋贷款额
         */
        paymentForEachMonth = ((amount / months) + (amount * rate)).toFixed(2)
        decreaseForEachMonth = (amount / months * rate).toFixed(2)
        intrestForAll = ((months + 1) * amount * rate / 2 / 10000).toFixed(2)
        paymentForAll = (((months + 1) * amount * rate / 2 + amount) / 10000).toFixed(2)
        this.paymentForEachMonth = paymentForEachMonth
        this.decreaseForEachMonth = decreaseForEachMonth
        this.paymentForAll = paymentForAll + '万'
        this.intrestForAll = intrestForAll + '万'
        return [paymentForEachMonth, decreaseForEachMonth, paymentForAll, intrestForAll]
      }
    },
    caculateBusinessLoan (type) {
      if (this.businessAmount === '') {
        return
      }
      var amount = parseFloat(this.businessAmount) * 10000 // 贷款金额
      var rate = parseFloat((parseFloat(this.businessRate) / 12 / 100).toFixed(5))  // 月利率
      var months = parseInt(this.businessYears) * 12  // 贷款月数
      var paymentForEachMonth = 0
      var paymentForAll = 0
      var intrestForAll = 0
      var decreaseForEachMonth = 0
      if (type === 1) {
        /**
         * 商业贷款计算
         * （1）等额本息计算：
         * 每月月供 = ［贷款本金×月利率×（1＋月利率）＾还款月数］÷［（1＋月利率）＾还款月数－1]
         * 支付利息 = 还款月数×每月月供额-贷款本金
         * 还款总额
         */
        paymentForEachMonth = ([amount * rate * Math.pow((1 + rate), months)] / [Math.pow((1 + rate), months) - 1]).toFixed(2)
        intrestForAll = ((months * paymentForEachMonth - amount) / 10000).toFixed(2)
        paymentForAll = ((paymentForEachMonth * months) / 10000).toFixed(2)
        this.paymentForEachMonth = paymentForEachMonth
        this.intrestForAll = intrestForAll + '万'
        this.paymentForAll = paymentForAll + '万'
        return [paymentForEachMonth, paymentForAll, intrestForAll]
      } else {
        /**
         * 商业贷款计算
         * （2）等额本金计算：
         * 首月月供 = (贷款本金÷还款月数)+贷款本金×月利率
         * 支付利息 = （还款月数＋1）×贷款额×月利率/2
         * 每月月供递减额 = 每月应还本金×月利率=贷款本金÷还款月数×月利率
         * 还款总额＝（还款月数＋1）＊贷款额＊月利率／2＋贷款额
         */
        paymentForEachMonth = ((amount / months) + (amount * rate)).toFixed(2)
        decreaseForEachMonth = (amount / months * rate).toFixed(2)
        intrestForAll = ((months + 1) * amount * rate / 2 / 10000).toFixed(2)
        paymentForAll = (((months + 1) * amount * rate / 2 + amount) / 10000).toFixed(2)
        this.paymentForEachMonth = paymentForEachMonth
        this.decreaseForEachMonth = decreaseForEachMonth
        this.intrestForAll = intrestForAll + '万'
        this.paymentForAll = paymentForAll + '万'
        return [paymentForEachMonth, decreaseForEachMonth, paymentForAll, intrestForAll]
      }
    },
    caculateGroup (type) {
      var arr1 = []
      var arr2 = []
      if (type === 1) {
        arr1 = this.caculateFundLoan(1)
        arr2 = this.caculateBusinessLoan(1)
        this.paymentForEachMonth = (parseFloat(arr1[0]) + parseFloat(arr2[0])).toFixed(2)
        this.paymentForAll = (parseFloat(arr1[1]) + parseFloat(arr2[1])).toFixed(2) + '万'
        this.intrestForAll = (parseFloat(arr1[2]) + parseFloat(arr2[2])).toFixed(2) + '万'
      } else {
        arr1 = this.caculateFundLoan(2)
        arr2 = this.caculateBusinessLoan(3)
        this.paymentForEachMonth = (parseFloat(arr1[0]) + parseFloat(arr2[0])).toFixed(2)
        this.decreaseForEachMonth = (parseFloat(arr1[1]) + parseFloat(arr2[1])).toFixed(2)
        this.paymentForAll = (parseFloat(arr1[2]) + parseFloat(arr2[2])).toFixed(2) + '万'
        this.intrestForAll = (parseFloat(arr1[3]) + parseFloat(arr2[3])).toFixed(2) + '万'
      }
    },
    caculate () {
      // 等额本息
      var type = parseInt(this.loanType)
      if (this.activeTab) {
        switch (type) {
          case 1:
            this.caculateFundLoan(1)
            break
          case 2:
            this.caculateBusinessLoan(1)
            break
          case 3:
            this.caculateGroup(1)
        }
      } else {
        // 等额本金
        switch (type) {
          case 1:
            this.caculateFundLoan(2)
            break
          case 2:
            this.caculateBusinessLoan(2)
            break
          case 3:
            this.caculateGroup(2)
        }
      }
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('to:', to)
      console.log('from:', from)
      console.log(this.$store.state.localPopState)
      if (!this.$store.state.localPopState && (from.name === 'Home' || from.name === 'Financial')) {
        this.$router.replace('/')
      } else {
        this.$store.commit('saveLocalPopState', false)
      }
    },
    getFundRate (val) {
      this.fundRate = this.$store.state.fundRate
    },
    getBusinessRate (val) {
      this.businessRate = this.$store.state.businessRate
    },
    fundAmount (val) {
      this.paymentForEachMonth = '0.00'
      this.decreaseForEachMonth = '0.00'
      this.paymentForAll = '0.00'
      this.intrestForAll = '0.00'
    },
    fundYears (val) {
      this.paymentForEachMonth = '0.00'
      this.decreaseForEachMonth = '0.00'
      this.paymentForAll = '0.00'
      this.intrestForAll = '0.00'
    },
    fundRate (val) {
      this.paymentForEachMonth = '0.00'
      this.decreaseForEachMonth = '0.00'
      this.paymentForAll = '0.00'
      this.intrestForAll = '0.00'
    },
    businessAmount (val) {
      this.paymentForEachMonth = '0.00'
      this.decreaseForEachMonth = '0.00'
      this.paymentForAll = '0.00'
      this.intrestForAll = '0.00'
    },
    businessYears (val) {
      this.paymentForEachMonth = '0.00'
      this.decreaseForEachMonth = '0.00'
      this.paymentForAll = '0.00'
      this.intrestForAll = '0.00'
    },
    businessRate (val) {
      this.paymentForEachMonth = '0.00'
      this.decreaseForEachMonth = '0.00'
      this.paymentForAll = '0.00'
      this.intrestForAll = '0.00'
    }
  },
  computed: {
    getFundRate () {
      return this.$store.state.fundRate
    },
    getBusinessRate () {
      return this.$store.state.businessRate
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
    padding-top: 16.4rem;
    padding-bottom: 3rem;
    min-height: 100%;
    box-sizing: border-box;
    background-color: #F1F1F1;
    .action-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 5rem 1rem 2rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background: url(../../assets/image/bg.png) no-repeat 0 0 / 100% 100%;
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
          background: transparent;
          color: #fff;
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
          color: #5A8DE9;
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
            margin-top: 0.2rem;
            font-size: .7rem;
          }
          .content-value{
            height: 1.6rem;
            font-size: 1.4rem;
          }
        }
        .textC{
          text-align: center;
        }
      }
    }
    .margB{
      margin-bottom: .4rem;
    }
    .result-wrapper{
      background-color: #fff;
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

