<template>
  <div class="company">
    <company-header
      ref="companyHeader"
      :company-data="companyData"
      :search-value="searchValue"
      @changeRecommend="changeRecommend"
      @changeFilters="changeFilters"
      @changePopup="changePopup"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      @load="getCompanyList"
      finished-text="没有更多了"
    >
      <company-list
        :company-list="companyList"
      />
    </van-list>
    <company-popup 
      ref="companyPopup"
      :range-list="rangeList"
      :company-data="companyData"
      @isShowBanner="isShowBanner"
      @distanceClick="distanceClick"
      @scoreClick="scoreClick"
      @clearClick="clearClick"
      @sureClick="sureClick"
    />
  </div>
</template>

<script>
import CompanyHeader from './child/CompanyHeader'
import CompanyList from './child/CompanyList'
import CompanyPopup from './child/CompanyPopup'

import { getCompanyList } from 'network/company'

export default {
  name: 'Company',
  components: {
    CompanyHeader,
    CompanyList,
    CompanyPopup
  },
  data () {
    return {
      searchValue: '',
      companyList: [],
      companyData: {
        start: 0, //	否	number	起始索引	0
        limit: 5, //	否	number	个数	5
        distance: undefined, //	否	string	距离筛选条件，desc倒序，asc升序	无
        score: undefined, //	否	string	评分筛选条件，desc倒序，asc升序	无
        scoreRange: undefined //	否	string	评分范围，比如 0 -1	无
      },
      loading: false,
      finished: false,
      rangeList: [
        { text: '4分-5分', value: '4-5' },
        { text: '3分-4分', value: '3-4' },
        { text: '2分-3分', value: '2-3' },
        { text: '1分-2分', value: '1-2' },
        { text: '1分以下', value: '0-1' }
      ]
    }
  },
  methods: {
    async getCompanyList () {
      let query = {
        ...this.companyData,
        q: this.searchValue
      }
      const res = await getCompanyList(query)
      res.data.list.forEach(item => {
        item.logo = process.env.VUE_APP_BASEURL + item.logo
      })
      this.companyList = [...this.companyList, ...res.data.list]
      this.loading = false
      // 修改起始下标
      this.companyData.start += this.companyData.limit
      // 判断数据是否加载完毕
      if (this.companyList.length >= res.data.total) {
        this.finished = true
      }
    },
    changeFilters(res) {
      // 判断： 如果 distance 为 undefined 则 distance 设置为 desc ，否则取反（desc 与 asc 中取反）
      if (!this.companyData[res]) {
        this.companyData[res] = 'desc'
      } else {
        this.companyData[res] = this.companyData[res] === 'desc' ? 'asc' : 'desc'
      }
      // 清除之前的数据： companyList start finished
      this.companyList = []
      this.companyData.start = 0
      this.finished = false
      // 重新请求公司数据
      this.getCompanyList()
    },
    changeRecommend () {
      this.companyData =  {
        start: 0, //	否	number	起始索引	0
        limit: 5, //	否	number	个数	5
        distance: undefined, //	否	string	距离筛选条件，desc倒序，asc升序	无
        score: undefined, //	否	string	评分筛选条件，desc倒序，asc升序	无
        scoreRange: undefined //	否	string	评分范围，比如 0 -1	无
      }
      this.finished = false
      this.loading = false
      this.companyList = []
      this.getCompanyList()
    },
    // 打开遮罩层
    changePopup() {
      this.$refs.companyPopup.openPopup = true
    },
    // 控制 banner 是否显示
    isShowBanner(res) {
      this.$refs.companyHeader.isShow = res
    },
    // 点击遮罩层的 距离 选项
    distanceClick(res) {
      this.companyData.distance = res
    },
    // 点击遮罩层的 评分 选项
    scoreClick(res) {
      this.companyData.scoreRange = res
    },
    clearClick() {
      this.companyData.distance = undefined
      this.companyData.scoreRange = undefined
      this.companyData.score = undefined
    },
    sureClick() {
      this.companyList = []
      this.companyData.start = 0
      this.finished = false
      this.getCompanyList()
      this.$refs.companyPopup.openPopup = false
    }
  }
}
</script>

<style scoped lang="scss">
.company {
  min-height: calc(100vh - 50px);
  padding-bottom: 50px;
  background: #ffffff;
  /deep/ .van-popup--top,
  /deep/ .van-overlay {
    top: 130px;
  }
}
</style>