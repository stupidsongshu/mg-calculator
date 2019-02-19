<template>
  <div class="home-wrapper">
    <lt-header :title="'房贷计算'"></lt-header>
    <tab-nav></tab-nav>
    <div class="content">
      <div class="action-wrapper">
        <div class="tabs">
          <div class="tab-item" :class="{'activeTab': activeTab}" @click="toggleTabs(true)">等额本息</div>
          <div class="tab-item" :class="{'activeTab': !activeTab}" @click="toggleTabs(false)">等额本金</div>
        </div>
        <div class="action-content">
          <div class="content-item">
            <p class="content-title">参考月供（元）</p>
            <p class="content-value">{{paymentForEachMonth}}</p>
          </div>
          <div class="content-item" v-show="!activeTab">
            <p class="content-title">逐月递减（元）</p>
            <p class="content-value">{{decreaseForEachMonth}}</p>
          </div>
        </div>
        <div class="action-content">
          <div class="content-item">
            <p class="content-title">还款总额（元）</p>
            <p class="content-value">{{paymentForAll}}</p>
          </div>
          <div class="content-item">
            <p class="content-title">支付利息（元）</p>
            <p class="content-value">{{intrestForAll}}</p>
          </div>
        </div>
      </div>
      <div class="result-wrapper">
        <div class="select-item" @click="togglePopup1">
          <span class="select-item-title">贷款类型</span>
          <span class="select-item-result hasMore">{{select1}}</span>
        </div>
        <div class="select-item">
          <span class="select-item-title">贷款金额</span>
          <span class="select-item-result"><input type="number" placeholder="请输入贷款金额">万元</span>
        </div>
        <div class="select-item" @click="togglePopup2">
          <span class="select-item-title">贷款年限</span>
          <span class="select-item-result hasMore">{{select2}}年</span>
        </div>
        <div class="select-item" @click="gotoFundPage">
          <span class="select-item-title">公积金利率</span>
          <span class="select-item-result hasMore">{{'3.25%'}}</span>
        </div>
      </div>
    </div>
    <router-view></router-view>
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
  </div>
</template>
<script>
import TabNav from '@/components/TabNav'
import LtHeader from '@/components/Head'
export default {
  data () {
    return {
      activeTab: true,
      paymentForEachMonth: '0.00',
      decreaseForEachMonth: '0.00',
      paymentForAll: '0.00',
      intrestForAll: '0.00',
      popupVisible1: false,
      tempSelect1: '',
      select1: '',
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
      popupVisible2: false,
      tempSelect2: '',
      select2: '',
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
    toggleTabs (val) {
      this.activeTab = val
    },
    togglePopup1 () {
      this.popupVisible1 = !this.popupVisible1
    },
    ensure1 () {
      this.popupVisible1 = !this.popupVisible1
      this.select1 = this.tempSelect1
    },
    onChange1 (picker, values) {
      this.tempSelect1 = values[0].name
    },
    togglePopup2 () {
      this.popupVisible2 = !this.popupVisible2
    },
    ensure2 () {
      this.select2 = this.tempSelect2
      this.popupVisible2 = !this.popupVisible2
    },
    onChange2 (picker, values) {
      this.tempSelect2 = values[0].id
    },
    gotoFundPage () {
      this.$router.push('/home/fund')
    }
  }
}
</script>
<style lang="scss" scoped>
.home-wrapper{
  width: 100%;
  height: 100%;
  .content{
    padding-top: 3rem;
    min-height: 100%;
    box-sizing: border-box;
    background-color: #F1F1F1;
    .action-wrapper{
      padding: .6rem 1rem;
      background-color: #5383E8;
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
            font-size: 1.4rem;
          }
        }
      }
    }
    .result-wrapper{
      margin-top: .4rem;
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
            border: none;
            -webkit-tap-highlight-color: transparent;
            text-align: right;
            font-size: .9rem;
            padding-right: .4rem;
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

