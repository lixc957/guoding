<template>
  <div class="comment" v-if="total">
    <div class="title">
      <span>评论</span>
      <sup>{{ total }}</sup>
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="comment-item" v-for="item in commentList" :key="item.id">
          <div class="comment-icon" @click="openPopup(item)">
            <img :src="baseUrl + item.author.avatar" alt="" />
          </div>
          <div class="comment-info">
            <div class="top">
              <div class="user">
                <div class="name">{{ item.author.nickname }}</div>
                <div class="time">{{ item.created_at | showTime }}</div>
              </div>
              <div class="star" @click="iconStarClick(item.id)">
                <span>{{ item.star ? item.star : 0 }}</span>
                <van-icon
                  name="good-job-o"
                  :class="{
                    active: $store.state.userInfo.starComments.includes(item.id)
                  }"
                />
              </div>
            </div>
            <div class="mid" @click="openPopup(item)">{{ item.content }}</div>
            <div class="bottom" v-if="item.children_comments.length">
              <ul>
                <li
                  v-for="itemy in item.children_comments"
                  :key="itemy.id"
                  @click="openPopup(itemy)"
                >
                  <span class="nickname">{{ itemy.author }}：</span>
                  <span class="content">{{ itemy.content }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { timeFormatMixin } from 'common/mixin'

export default {
  name: 'DetailCommentInfo',
  props: {
    commentList: {
      type: Array,
      default () {
        return []
      }
    },
    finished: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    baseUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    onLoad () {
      this.$emit('getComment')
    },
    openPopup (res) {
      this.$emit('openReplyComment', res)
    },
    iconStarClick(id) {
      this.$emit('iconStarToggle', id)
    }
  },
  mixins: [timeFormatMixin]
}
</script>

<style scoped lang="scss">
.comment {
  margin-top: 15px;
  padding: 15px;
  background: #fff;
  .title {
    span {
      color: #222222;
      font-size: 18px;
      font-weight: 600;
    }
    sup {
      display: inline-block;
      margin-left: 5px;
      font-size: 14px;
      color: #b4b4bd;
    }
  }
  .main {
    .comment-item {
      display: flex;
      align-items: flex-start;
      margin-top: 30px;
      .comment-icon {
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
      .comment-info {
        flex: 1;
        .top {
          display: flex;
          justify-content: space-between;
          .user {
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
          .star {
            display: flex;
            align-items: center;
            color: #b4b4bd;
            font-size: 14px;
            .van-icon {
              font-size: 18px;
              margin-left: 5px;
            }
            .active {
              color: red;
            }
          }
        }
        .mid {
          font-size: 16px;
          color: #181a39;
          line-height: 27px;
          margin: 10px 0;
        }
        .bottom {
          ul {
            padding: 10px;
            background: #f7f4f5;
            li {
              line-height: 20px;
              .nickname {
                font-size: 14px;
                font-weight: 600;
                color: #545671;
              }
              .content {
                font-size: 14px;
                font-weight: 400;
                color: #545671;
              }
            }
          }
        }
      }
    }
  }
}
</style>