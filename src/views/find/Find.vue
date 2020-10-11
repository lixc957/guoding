<template>
  <div class="find" v-if="technicList.length">
    <van-nav-bar title="发现"></van-nav-bar>
    <scroll class="find-content" ref="scroll" :probe-type="3">
      <find-technic :technic-list="technicList" :base-url="baseUrl" />
      <find-data 
        @showMoreData="showMoreData" 
        :market-data="marketData" 
        :data-list="dataList"
        :top-salary="topSalary"
        :is-open="isOpen" />
      <find-share 
        :base-url="baseUrl"
        :share-list="shareList" />
      <div class="down">到底啦...</div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/scroll/Scroll'
import FindTechnic from './child/FindTechnic'
import FindData from './child/FindData'
import FindShare from './child/FindShare'

import { getTechnicList, getMarketData, getShareList } from 'network/find'

export default {
  name: 'Find',
  components: {
    Scroll,
    FindTechnic,
    FindData,
    FindShare
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      technicList: [],
      marketData: {},
      // 市场展示数据
      dataList: [],
      dataFourList: [],
      dataAllList: [],
      topSalary: 0,
      // 市场数据是否展开
      isOpen: false,
      shareList: [],
      saveY: 0
    }
  },
  created () {
    this.getTechnicList()
    this.getMarketData()
    this.getShareList()
  },
  updated () {
    this.$nextTick(() => {
      this.$refs.scroll.refresh()
    })
  },
  methods: {
    async getTechnicList () {
      const res = await getTechnicList({ limit: 5 })
      this.technicList = res.data.list
    },
    async getMarketData () {
      const res = await getMarketData()
      res.data.yearSalary.reverse()
      // 4 条数据
      this.dataFourList = res.data.yearSalary.slice(0, 4)
      this.dataList = res.data.yearSalary.slice(0, 4)
      // 完整数据
      this.dataAllList = res.data.yearSalary
      // 年度平均工资
      this.topSalary = res.data.topSalary
      this.marketData = res.data
    },
    async getShareList() {
      const res = await getShareList({ limit: 5 })
      this.shareList = res.data.list
    },
    showMoreData () {
      // isOpen 取反
      this.isOpen = !this.isOpen
      // 判断
      if (this.isOpen) {
        // 显示完整数据
        this.dataList = this.dataAllList
      } else {
        this.dataList = this.dataFourList
      }
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.find {
  height: 100%;
  /deep/ .van-nav-bar__title {
    font-size: 18px;
    color: #222;
    font-weight: 600;
    font-family: PingFangSC, PingFangSC-Semibold;
  }
  .find-content {
    height: calc(100% - 46px);
  }
  .down {
    padding: 20px;
    font-size: 18px;
    text-align: center;
  }
}
</style>