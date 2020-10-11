<template>
  <div class="find-data">
    <find-title title="市场数据" />
    <div class="main">
      <div class="post">
        <span>{{marketData.city}}</span>
        <span>{{marketData.position}}</span>
      </div>
      <market-data v-bind="$attrs" />
      <div class="show-more" @click="showMore">
        <template v-if="!isOpen">
          展开更多 <van-icon name="arrow-down" />
        </template>
        <template v-else> 收起更多<van-icon name="arrow-up" /> </template>
      </div>
    </div>
  </div>
</template>

<script>
import FindTitle from './FindTitle'
import MarketData from 'components/data/MarketData'

export default {
  name: 'FindData',
  components: {
    FindTitle,
    MarketData
  },
  props: {
    marketData: {
      type: Object,
      default() {
        return {}
      }
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showMore () {
      this.$emit('showMoreData')
    }
  }
}
</script>

<style scoped lang="scss">
.find-data {
  margin-top: 10px;
  padding: 15px;
  background: #ffffff;
  .main {
    .post {
      margin: 15px 0;
      span {
        display: inline-block;
        padding: 6px;
        margin-right: 10px;
        font-size: 14px;
        color: #545671;
        background: #eceaea;
        border-radius: 8px;
      }
    }
    .show-more {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      width: 100%;
      font-size: 16px;
      color: #666;
    }
  }
}
</style>