<template>
  <div class="share-list">
    <div class="top">
      <van-nav-bar title="面经分享">
        <template #left>
          <i
            class="iconfont iconbtn_nav_back nav-back"
            @click="$router.back()"
          ></i>
        </template>
      </van-nav-bar>
      <div class="serach-box">
        <div class="inner" @click="$router.push('/search/share')">
          <i class="iconfont iconicon_search"></i>
          <span>请输入关键字</span>
        </div>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <share :share-list="list" :base-url="baseUrl" />
    </van-list>
  </div>
</template>

<script>
import Share from 'components/share/Share'
import { getShareList } from 'network/find'

export default {
  name: 'ShareList',
  components: {
    Share
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      list: [],
      loading: false, // 加载状态，true 不触发load事件
      finished: false, // 是否已加载完成, 加载完成不触发load事件
      start: 0,
      limit: 5
    }
  },
  methods: {
    async onLoad () {
      const res = await getShareList({
        start: this.start,
        limit: this.limit
      })
      this.list = [...this.list, ...res.data.list]
      // 修改索引,从上一次请求的后面继续请求
      this.start += this.limit
      // 如果数据没有铺满屏幕，则继续添加数据
      this.loading = false
      // 判断是否已经加载完
      if (this.list.length >= res.data.total) {
        // 停止加载
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.share-list {
  padding-top: 110px;
  .van-list {
    padding: 15px;
  }
  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: #fff;
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
      .inner {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 34px;
        background: #f7f4f5;
        border-radius: 17px;
        font-size: 14px;
        color: #b3b3b3;
      }
    }
  }
}
</style>