<template>
  <div class="article-info" v-if="articleInfo.author">
    <div class="title">{{articleInfo.title}}</div>
    <div class="author">
      <div class="left"><img :src="baseUrl + articleInfo.author.avatar" alt="" /></div>
      <div class="right">
        <div class="name">{{articleInfo.author.nickname}}</div>
        <div class="time">{{articleInfo.updated_at | showTime}}</div>
      </div>
    </div>
    <div class="content" v-html="articleInfo.content"></div>
  </div>
</template>

<script>
import { timeFormatMixin } from 'common/mixin'

export default {
  name: 'DetailArticleInfo',
  props: {
    articleInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    baseUrl: {
      type: String,
      default: ''
    }
  },
  mixins: [timeFormatMixin]
}
</script>

<style scoped lang="scss">
.article-info {
  padding: 15px;
  background: #fff;
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #181a39;
    line-height: 25px;
  }
  .author {
    display: flex;
    align-items: center;
    padding: 15px 0;
    .left {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
      background: #eee;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 35px;
      .name {
        font-size: 14px;
        font-weight: 600;
        color: #545671;
      }
      .time {
        font-size: 14px;
        font-weight: 600;
        color: #b4b4bd;
      }
    }
  }
  .content {
    font-size: 16px;
    font-weight: 500;
    color: #181a39;
    line-height: 27px;
    /deep/ img {
      width: 100% !important;
    }
  }
}
</style>