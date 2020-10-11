<template>
  <div class="share-search">
    <van-nav-bar title="面经分享">
      <template #left>
        <i
          class="iconfont iconbtn_nav_back nav-back"
          @click="$router.back()"
        ></i>
      </template>
    </van-nav-bar>
    <div class="serach-box">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="getResult"
        @cancel="onCancel"
        shape="round"
      />
    </div>
    <div class="main" v-if="!isResult">
      <div class="tags">
        <h3>大家都在搜</h3>
        <div class="keyword">
          <span 
            v-for="(item, index) in hotList" 
            :key="index"
            @click="getResult(item)"
          >{{ item }}</span>
        </div>
      </div>
      <div class="tags">
        <h3>历史搜索<span @click="removeLocal">清空</span></h3>
        <div class="keyword">
          <span 
            v-for="(item, index) in historyList" 
            :key="index"
            @click="getResult(item)"
          >{{ item }}</span>
        </div>
      </div>
    </div>
    <!-- 结果 -->
    <div class="result" v-else>
      <share :base-url="baseUrl" :share-list="searchResult" />
    </div>
  </div>
</template>

<script>
import Share from 'components/share/Share'
import { getHotList, getShareList } from 'network/find'
import { setToken, getToken, removeToken } from 'common/utils'

export default {
  name: 'SearchShare',
  components: {
    Share
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      value: '',
      hotList: [],
      // 是否有搜索结果
      isResult: false,
      // 搜索结果
      searchResult: [],
      // 历史搜索
      historyList: JSON.parse(getToken('historyShare')) || []
    }
  },
  created () {
    this.getHotList()
  },
  methods: {
    // 大家都在搜
    async getHotList () {
      const res = await getHotList()
      this.hotList = res.data
    },
    async getResult (key) {
      this.value = key
      // 清空搜索结果
      this.searchResult = []
      // 保存搜索记录
      this.historyList.unshift(key)
      // 去重
      this.historyList = [...new Set(this.historyList)]
      if (this.historyList.length > 5) {
        this.historyList = this.historyList.slice(0, 5)
      }
      // 本地存储
      setToken('historyShare', JSON.stringify(this.historyList))
      this.isResult = true
      const res = await getShareList({q: key})
      res.data.list.forEach(item => {
        item.title = item.title.replace(new RegExp(key, 'g'), `<b style="color:red">${key}</b>`)
      })
      this.searchResult = res.data.list
    },
    // onSearch (val) {
    //   console.log(val);
    // },
    onCancel () {
      this.isResult = false
    },
    removeLocal() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '您确定清空吗？'
        })
        .then(() => {
          this.historyList = []
          removeToken('historyShare')
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.share-search {
  /deep/ .van-nav-bar__left {
    padding-left: 0;
    .nav-back {
      font-size: 44px;
    }
  }
  /deep/ .van-nav-bar__title {
    font-size: 18px;
    font-weight: 600;
    color: #222;
  }
  .serach-box {
    padding: 15px;
  }
  .tags {
    padding: 15px;
    margin-bottom: 10px;
    h3 {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 18px;
      line-height: 25px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      color: #222222;
      > span {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #545671;
      }
    }
    .keyword {
      margin-top: 15px;
      span {
        display: inline-block;
        padding: 8px 11px;
        margin-right: 10px;
        background: #f7f4f5;
        border-radius: 8px;
        font-size: 14px;
        color: #545671;
      }
    }
  }
  .result {
    padding: 15px;
    .not {
      text-align: center;
      font-size: 16px;
    }
  }
}
</style>