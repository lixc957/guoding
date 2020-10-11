<template>
  <div class="share-detail">
    <van-nav-bar title="面经详情">
      <template #left>
        <i
          class="iconfont iconbtn_nav_back nav-back"
          @click="$router.back()"
        ></i>
      </template>
    </van-nav-bar>
    <!-- 文章详情 -->
    <detail-article-info :article-info="articleInfo" :base-url="baseUrl" />
    <!-- 评论详情 -->
    <detail-comment-info
      :finished="finished"
      :comment-list="commentList"
      :total="total"
      :base-url="baseUrl"
      @getComment="getComment"
      @openReplyComment="openReplyComment"
      @iconStarToggle="commentStarToggle"
      ref="commentInfo"
    />
    <!-- 底部信息 -->
    <detail-bottom-info
      @openPopup="openPopup"
      :article-info="articleInfo"
      :is-collect="isCollect"
      :is-star-article="isStarArticle"
      @iconStarToggle="articleStarToggle"
      @iconCollectToggle="articleCollectToggle"
    />
    <!-- 弹出层 -->
    <van-popup v-model="isPopup" position="bottom">
      <textarea :placeholder="placehold" v-model="txtValue"></textarea>
      <div class="send" @click="addComment">发送</div>
    </van-popup>
  </div>
</template>

<script>
import DetailArticleInfo from './child/DetailArticleInfo'
import DetailCommentInfo from './child/DetailCommentInfo'
import DetailBottomInfo from './child/DetailBottomInfo'

import {
  getArticle,
  getComment,
  addComment,
  articleCollectToggle,
  articleStarToggle,
  commentStarToggle
} from 'network/detail'
import { tipsLoading } from 'common/utils'
import { mapState } from 'vuex'

export default {
  name: 'ShareDetail',
  components: {
    DetailArticleInfo,
    DetailCommentInfo,
    DetailBottomInfo
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      id: this.$route.params.id,
      articleInfo: {},
      commentList: [],
      total: 0,
      finished: false,
      start: 0,
      isPopup: false,
      placehold: '',
      txtValue: '',
      // 是否添加回复数据
      isReply: false,
      // 当前评论的id
      commentId: 0
    }
  },
  created () {
    this.getArticle()
    this.getComment()
  },
  computed: {
    ...mapState(['userInfo']),
    // 文章是否收藏
    isCollect () {
      return this.userInfo.collectArticles.includes(+this.id)
    },
    isStarArticle () {
      return this.userInfo.starArticles.includes(+this.id)
    }
  },
  methods: {
    /**
     * 	网络请求相关方法
     */
    async getArticle () {
      const res = await getArticle({ id: this.id })
      this.articleInfo = res.data
    },
    async getComment () {
      const res = await getComment({
        id: this.id,
        start: this.start,
        limit: 5
      })
      this.total = res.data.total
      this.commentList = [...this.commentList, ...res.data.list]
      this.start += 5
      this.$refs.commentInfo.loading = false
      if (this.commentList.length >= this.total) {
        this.finished = true
      }
    },
    async addComment () {
      tipsLoading('发送中')
      try {
        if (!this.isReply) {
          const res = await addComment({
            content: this.txtValue,
            article: this.id
          })
          const data = res.data
          this.commentList.unshift(data)
        }
        else {
          const res = await addComment({
            content: this.txtValue,
            parent: this.commentId
          })
          const comment = this.commentList.find(item => this.commentId === item.id)
          comment.children_comments.push(res.data)
        }
        this.$toast.success('发送成功')
        this.isPopup = false
        this.txtValue = ''
      } catch (error) {
        this.$toast.fail(error.message)
        this.$router.push('/login?redirect=' + this.$route.fullPath)
      }
    },
    async articleStarToggle (id) {
      try {
        tipsLoading()
        const res = await articleStarToggle({ article: id })
        this.$store.commit('setStarArticle', res.data.list)
        this.articleInfo.star = res.data.num
        if (this.isStarArticle) {
          this.$toast.success('点赞成功')
        } else {
          this.$toast.success('取消成功')
        }
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    async articleCollectToggle (id) {
      try {
        tipsLoading()
        const res = await articleCollectToggle({ id })
        this.$store.commit('setCollectArticle', res.data.list)
        this.articleInfo.collect = res.data.num
        console.log(res);
        if (this.isCollect) {
          this.$toast.success('收藏成功')
        } else {
          this.$toast.success('取消成功')
        }
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    async commentStarToggle (id) {
      try {
        const res = await commentStarToggle({ id })
        this.$store.commit('setStarComment', res.data.list)
        const comment = this.commentList.find(item => item.id === id)
        comment.star = res.data.num
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    /**
     * 	事件相关方法
     */
    openPopup () {
      this.isPopup = true
      this.placehold = '请输入评论内容'
      this.isReply = false
    },
    openReplyComment (res) {
      const nickname = res.author.nickname || res.author
      this.placehold = '回复：' + nickname
      this.isPopup = true
      this.isReply = true
      this.commentId = res.id
    }
  }
}
</script>

<style scoped lang="scss">
.share-detail {
  padding-top: 46px;
  margin-bottom: 70px;
  background: #f7f4f5;
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
  .van-popup {
    padding: 15px;
    padding-top: 25px;
    textarea {
      width: 100%;
      height: 100px;
      background: #f7f4f5;
      padding-top: 10px;
      padding-left: 15px;
      font-size: 14px;
      border: 0;
      outline: 0;
      resize: none;
      &::placeholder {
        color: #00b8d4;
        font-size: 14px;
      }
    }
    .send {
      float: right;
      margin-top: 10px;
      color: #b4b4bd;
      font-size: 16px;
    }
  }
}
</style>