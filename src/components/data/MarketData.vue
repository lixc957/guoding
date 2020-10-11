<template>
  <div class="data-box">
    <div class="data-item" v-for="(item, index) in dataList" :key="index">
      <div class="year">{{item.year}}</div>
      <div class="progress">
        <div class="inner" :style="{width: (item.salary / topSalary) * 100 + '%'}">
          <span>￥{{item.salary}}</span>
        </div>
      </div>
      <div class="count">
        <i v-if="item.percent > 0" style="color: green" class="iconfont iconicon_shangsheng"></i>
        <i v-else style="color: red" class="iconfont iconicon_xiajiang"></i>
        <span>{{item.percent}}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarketData',
  inheritAttrs: false,
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    },
    topSalary: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
.data-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  font-size: 16px;
  .year {
    color: #545671;
    line-height: 20px;
  }
  .progress {
    margin: 0 10px;
    flex: 1;
    background: #eee;
    height: 20px;
    border-radius: 5px;
    overflow: hidden;
    .inner {
      position: relative;
      background-color: #fe6d67;
      border-radius: 5px;
      height: 100%;
      color: #fff;
      box-sizing: border-box;
      > span {
        position: absolute;
        top: 3px;
        right: 5px;
      }
    }
  }
  .count {
    width: 60px;
    span {
      display: inline-block;
      margin-left: 3px;
    }
  }
}
</style>