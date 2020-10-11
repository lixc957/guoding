<template>
  <div class="technic-box">
    <div class="technic-item" v-for="item in technicList" :key="item.id">
      <div class="word">
        <div class="top">{{ item.title }}</div>
        <div class="bottom">
          <div class="time">{{ item.updated_at | showTime }}</div>
          <div class="read">
            <i class="iconfont iconicon_liulanliang"></i>
            <span>{{ item.read }}</span>
          </div>
          <div class="star">
            <i class="iconfont iconicon_dianzanliang"></i>
            <span>{{ item.star }}</span>
          </div>
        </div>
      </div>
      <div class="img">
        <img :src="baseUrl + item.cover" alt="" v-if="item.cover" />
        <img src="~assets/img/find/shilian.jpg" alt="" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { timeFormatMixin } from 'common/mixin'

export default {
  name: 'Technic',
  inheritAttrs: false,
  mixins: [timeFormatMixin],
  props: {
    technicList: {
      type: Array,
      default () {
        return []
      }
    },
    baseUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.technic-item {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  .word {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      color: #181a39;
      line-height: 25px;
      padding-right: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; //第三行文本超出就显示省略号
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bottom {
      display: flex;
      align-items: center;
      margin-top: 10px;
      color: #b4b4bd;
      font-size: 14px;
      .time {
        flex: 1;
      }
      .read {
        display: flex;
        align-items: center;
      }
      .star {
        display: flex;
        align-items: center;
      }
      span {
        display: inline-block;
        margin: 0 12px 0 2px;
      }
    }
  }
  .img {
    width: 113px;
    height: 75px;
    border-radius: 4px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>