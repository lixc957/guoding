<template>
  <div class="share-item">
    <van-cell v-for="item in shareList" :key="item.id" @click="$router.push(`/detail/share/${item.id}`)">
      <template #title>
        <div class="title" v-html="item.title"></div>
        <div class="content">{{ item.content }}</div>
        <div class="other">
          <div class="auth">
            <img :src="baseUrl + item.author.avatar" alt="" />
            <span>{{ item.author.nickname }}</span>
          </div>
          <div class="time">{{ item.updated_at | showTime }}</div>
          <div class="comment">
            <i class="iconfont iconicon_pinglunliang"></i>
            <span>{{ item.article_comments }}</span>
          </div>
          <div class="star">
            <van-icon name="good-job-o" />
            <span>{{ item.star }}</span>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { timeFormatMixin } from 'common/mixin'

export default {
  name: 'Share',
  inheritAttrs: false,
  props: {
    shareList: {
      type: Array,
      default() {
        return []
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
.share-item {
  .van-cell {
    padding: 10px 0;
    &:first-child {
      padding-top: 0;
      margin-top: -10px;
    }
  }
  .van-cell__title {
    width: 100%;
    .title {
      font-size: 18px;
      font-weight: 600;
      line-height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .content {
      font-size: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
    .other {
      display: flex;
      align-items: center;
      margin-top: 15px;
      height: 30px;
      color: #ccc;
      .auth {
        flex: 1;
        font-size: 16px;
        display: flex;
        align-items: center;
        img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          margin-right: 10px;
          position: relative;
          top: -3px;
        }
      }
      .time {
        font-size: 16px;
        margin-right: 20px;
      }
      .comment,
      .star {
        margin-right: 15px;
        font-size: 16px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>