<template>
  <van-popup
    v-model="openPopup"
    position="bottom"
    :style="{ height: '100%' }"
    class="inner-popup"
  >
    <van-nav-bar title="答题卡">
      <template #left>
        <i
          class="iconfont iconbtn_nav_back nav-back"
          @click="openPopup = false"
        ></i>
      </template>
      <template #right>
        <span>{{ currentIndex + 1 }}</span
        >/<span>{{ questionList.length }}</span
        >题
      </template>
    </van-nav-bar>
    <div class="total-question">共{{ questionList.length }}题</div>
    <div class="answer-list">
      <ul>
        <li
          :class="{
            current: currentIndex === index,
            error: item.result && !item.result.isRight,
            success: item.result && item.result.isRight
          }"
          v-for="(item, index) in questionList"
          :key="index"
          @click="toIndex(index)"
        >
          {{ index + 1 }}
        </li>
      </ul>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'InnerPopup',
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    questionList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      openPopup: false
    }
  },
  methods: {
    toIndex(index) {
      this.$emit('getIndexQuestion', index)
    }
  },
}
</script>

<style scoped lang="scss">
.inner-popup {
  padding-top: 46px;
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
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
  }
  .total-question {
    height: 44px;
    padding-left: 15px;
    background: #f7f4f5;
    line-height: 44px;
    color: #b4b4bd;
    font-size: 14px;
  }
  .answer-list {
    padding: 20px 0;
    padding-left: 17px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        margin: 0 15px 20px 0;
        border: 1px solid #b4b4bd;
        border-radius: 50%;
        font-size: 14px;
        color: #b4b4bd;
      }
      .current {
        border: 1px solid #666;
        color: #666;
      }
      .error {
        background-color: #ffefea;
        color: #ff4949;
        border: none;
      }
      .success {
        background: #ddfad9;
        color: #1dc779;
        border: none;
      }
    }
  }
}
</style>