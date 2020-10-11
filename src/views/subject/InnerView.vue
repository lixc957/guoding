<template>
  <div class="subject-inner" v-if="questionList.length">
    <van-nav-bar>
      <template #left>
        <i
          class="iconfont iconbtn_nav_back nav-back"
          @click="$router.back()"
        ></i>
      </template>
      <template #title>
        面试题<sup>{{ questionList.length }}</sup>
      </template>
      <template #right>
        <span @click="openPopup">答题卡</span>
      </template>
    </van-nav-bar>
    <inner-content
      :question-list="questionList"
      :current-question="currentQuestion"
      ref="innerContent"
      @changRedio="changRedio"
      @changChecked="changChecked"
      @changDisabled="changDisabled"
    />
    <inner-answer
      :current-question="currentQuestion"
      :current-radio="currentRadio"
      :current-checked="currentChecked"
    />
    <div class="inner-bottom-bar">
      <div class="inner-left-icon">
        <div class="icon-item collect" :class="{active: isCollectQuestion}" @click="collectQuestion">
          <i class="iconfont iconbtn_shoucang_sel"></i>
          <p>收藏</p>
        </div>
        <div class="icon-item feedback">
          <i class="iconfont iconbtn_shuati_fankui"></i>
          <p>反馈</p>
        </div>
      </div>
      <div class="inner-mid-count">
        <span class="currentCount">{{ currentIndex + 1 }}</span
        >/{{ questionList.length }}题
      </div>
      <div class="inner-right-submit">
        <van-button
          type="danger"
          v-if="!currentQuestion.result && !isEnd"
          class="btn btn-submit"
          :disabled="isDisabled"
          @click="submit"
          >提交</van-button
        >
        <van-button
          type="info"
          v-else-if="currentQuestion.result && !isEnd"
          class="btn btn-next"
          @click="getNextQuestion"
          >下一题</van-button
        >
        <van-button type="danger" v-else class="btn btn-next" @click="endAnwser"
          >结束答题</van-button
        >
      </div>
    </div>

    <inner-popup
      :current-index="currentIndex"
      :question-list="questionList"
      ref="innerPopup"
      @getIndexQuestion="getIndexQuestion"
    />
  </div>
</template>

<script>
import InnerContent from './child/InnerContent'
import InnerAnswer from './child/InnerAnswer'
import InnerPopup from './child/InnerPopup'

import { getQuestionList, submitQuestion, getNextQuestion, collectQuestion } from 'network/subject'
import { tipsLoading } from 'common/utils'

export default {
  name: 'InnerView',
  components: {
    InnerContent,
    InnerAnswer,
    InnerPopup
  },
  data () {
    return {
      positionType: this.$route?.query?.type,
      city: this.$route?.query?.city,
      questionList: [],
      currentIndex: 0,
      currentRadio: '',
      currentChecked: [],
      isDisabled: true
    }
  },
  created () {
    this.getQuestionList()
  },
  methods: {
    async getQuestionList () {
      const res = await getQuestionList({
        type: this.positionType,
        city: this.city
      })
      this.questionList = res.data
    },
    async submit () {
      const res = await submitQuestion({
        id: this.currentQuestion.id,
        singleAnswer: this.currentRadio,
        multipleAnswer: this.currentChecked
      })
      this.$set(this.questionList[this.currentIndex], 'result', res.data)
    },
    async getNextQuestion () {
      this.currentIndex++
      this.$refs.innerContent.radio = ''
      this.$refs.innerContent.checked = []
      this.$refs.innerContent.txtValue = ''
      const res = await getNextQuestion(this.currentQuestion.id)
      this.$set(this.questionList[this.currentIndex], 'detail', res.data)
    },
    async getIndexQuestion (index) {
      this.currentIndex = index
      // 判断是否存在题目
      if (!this.currentQuestion.detail) {
        const res = await getNextQuestion(this.currentQuestion.id)
        this.$set(this.questionList[this.currentIndex], 'detail', res.data)
      }
      this.$refs.innerPopup.openPopup = false
    },
    async collectQuestion() {
      tipsLoading()
      const res = await collectQuestion(this.currentQuestion.id)
      this.$store.commit('setCollectQuestion', res.data)
      if (this.isCollectQuestion) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.success('取消成功')
      }
    },
    changRedio (res) {
      this.currentRadio = res
    },
    changChecked (res) {
      this.currentChecked = res
    },
    changDisabled (res) {
      this.isDisabled = res
    },
    endAnwser () {
      let isAllAnwser = this.questionList.every(item => item.result)
      if (isAllAnwser) {
        this.$toast.success('恭喜您已完成所有答题')
        this.$router.back()
      } else {
        this.$dialog .confirm({
          title: '温馨提示',
          message: '您还有题目未作答，确定结束吗？',
        })
          .then(() => {
            this.$toast.success('已提交答题卡')
            this.$router.back()
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    openPopup () {
      this.$refs.innerPopup.openPopup = true
    }
  },
  computed: {
    currentQuestion () {
      return this.questionList[this.currentIndex] || {}
    },
    isEnd () {
      return this.currentIndex + 1 === this.questionList.length
    },
    isCollectQuestion() {
      return this.$store.state.userInfo.collectQuestions && this.$store.state.userInfo.collectQuestions.includes(this.currentQuestion.id)
    }
  }
}
</script>

<style scoped lang="scss">
.subject-inner {
  position: relative;
  padding-top: 46px;
  padding-bottom: 95px;
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
      sup {
        color: #545671;
        font-size: 14px;
        font-weight: 400;
        margin-left: 4px;
      }
    }
  }
  .inner-bottom-bar {
    position: fixed;
    bottom: -2px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px 25px 15px;
    height: 85px;
    background: #ffffff;
    box-shadow: 0px -6px 8px 0px rgba(24, 26, 57, 0.04);
    .inner-left-icon {
      display: flex;
      text-align: center;
      font-size: 14px;
      color: #b4b4bd;
      .icon-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.collect {
          margin-right: 21px;
        }
        &.active {
          color: red;
        }
        i {
          display: block;
          font-size: 30px;
        }
      }
    }
    .inner-mid-count {
      align-self: center;
      font-size: 18px;
      color: #545671;
      .currentCount {
        font-size: 22px;
        color: #e40137;
      }
    }
    .inner-right-submit {
      align-self: center;
      .btn {
        width: 98px;
        height: 40px;
        border-radius: 7px;
        &.btn-submit {
          background: #e40137;
        }
      }
    }
  }
}
</style>