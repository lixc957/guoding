<template>
  <div class="inner-answer" v-if="currentQuestion.result">
    <div class="answer-title">答案解析</div>
    <div class="answer-result">
      <template v-if="currentQuestion.detail.type === 1">
        正确答案：{{ currentQuestion.result.singleAnswer }}
        <span style="margin-left: 10px">我的答案：{{ currentRadio }}</span>
      </template>
      <template v-if="currentQuestion.detail.type === 2">
        正确答案：{{ currentQuestion.result.multipleAnswer.join(' ') }}
        <span style="margin-left: 10px">我的答案：{{ currentChecked | showArray }}</span>
      </template>
    </div>
    <div class="answer-diddiculty">
      <p>难度：{{ currentQuestion.detail.difficulty | showDiff }}</p>
      <p>提交次数：{{ currentQuestion.result.submitNum }}</p>
      <p>正确次数：{{ currentQuestion.result.correctNum }}</p>
    </div>
    <div class="answer-resolve">{{ currentQuestion.result.answerAnalysis }}</div>   
  </div>
</template>

<script>
export default {
  name: 'InnerAnswer',
  props: {
    currentQuestion: {
      type: Object,
      default() {
        return {}
      }
    },
    currentRadio: {
      type: String,
      default: ''
    },
    currentChecked: {
      type: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    showDiff(value) {
      switch (value) {
        case 1:
          return '简单'
          break;
        case 2:
          return '一般'
          break;
        case 3:
          return '困难'
          break;
      
        default:
          return ''
          break;
      }
    },
    showArray (arr) {
      return arr.slice().sort().join(' ')
    }
  }
}
</script>

<style scoped lang="scss">
.inner-answer {
  padding: 0 15px;
  .answer-title {
    margin-bottom: 18px;
    font-size: 18px;
    font-weight: 600;
    color: #222222;
  }
  .answer-result {
    margin-bottom: 18px;
    font-size: 16px;
    font-weight: 400;
    color: #1dc779;
  }
  .answer-diddiculty {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 8px 12px;
    background: #f7f4f5;
    font-size: 14px;
    color: #545671;
  }
  .answer-resolve {
    font-size: 16px;
    letter-spacing: 1px;
    color: #181a39;
  }
}
</style>