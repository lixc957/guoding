<template>
  <div class="inner-content" v-if="currentQuestion.detail">
    <div class="content-title">
      【{{ questionType }}】{{ currentQuestion.detail.title }}
    </div>
    <div class="content-tags">
      <ul>
        <li v-for="(item, index) in currentQuestion.detail.tag" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="content-option">
      <van-radio-group
        v-model="radio"
        v-if="questionType === '单选'"
        :disabled="!!currentQuestion.result"
      >
        <van-radio
          :name="index"
          v-for="(item, index) in currentQuestion.detail.option"
          :key="index"
          icon-size="16px"
          class="option-item"
          :class="setClass(index)"
        >
          <template #icon>{{ index | showOption }}.</template>
          <template>
            {{ item }}
            <i class="iconfont iconicon_cuowu"></i>
            <i class="iconfont iconicon_zhengque"></i>
          </template>
        </van-radio>
      </van-radio-group>
      <van-checkbox-group 
        v-model="checked" 
        v-else-if="questionType === '多选'" 
        :disabled="!!currentQuestion.result"
      >
        <van-checkbox
          :name="index"
          v-for="(item, index) in currentQuestion.detail.option"
          :key="index"
          icon-size="16px"
          class="option-item"
          :class="setClass(index)"
        >
          <template #icon>{{ index | showOption }}.</template>
          <template>
            {{ item }}
            <i class="iconfont iconicon_cuowu"></i>
            <i class="iconfont iconicon_zhengque"></i>
          </template>
        </van-checkbox>
      </van-checkbox-group>
      <div class="textarea-box" v-else>
        <textarea v-model.trim="txtValue" placeholder="请输入答案"></textarea>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'InnerContent',
  props: {
    questionList: {
      type: Array,
      default () {
        return []
      }
    },
    currentQuestion: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      radio: '',
      checked: [],
      txtValue: ''
    }
  },
  methods: {
    filterIndex (value) {
      switch (value) {
        case 0:
          return 'A'
          break;
        case 1:
          return 'B'
          break;
        case 2:
          return 'C'
          break;
        case 3:
          return 'D'
          break;
        default:
          return ''
          break;
      }
    }
  },
  computed: {
    questionType () {
      switch (this.currentQuestion?.detail?.type) {
        case 1:
          return '单选'
          break;
        case 2:
          return '多选'
          break;
        case 3:
          return '简答'
          break;

        default:
          return '单选'
          break;
      }
    },
    currentRadio () {
      return this.filterIndex(this.radio)
    },
    currentChecked () {
      return this.checked.map(item => this.filterIndex(item)) || []
    },
    setClass () {
      return res => {
        res = this.filterIndex(res)
        // 没有结果，返回空
        if (!this.currentQuestion.result) {
          return ''
        }
        // 单选题判断
        if (this.currentQuestion.detail.type === 1) {
          if (this.currentQuestion.result.singleAnswer === res) {
            return 'success'
          }
          if (this.currentRadio === res && this.currentQuestion.result.singleAnswer !== res) {
            return 'error'
          }
        }

        // 多选题判断
        if (this.currentQuestion.detail.type === 2) {
          if (this.currentQuestion.result.multipleAnswer.includes(res)) {
            return 'success'
          }
          if (this.currentChecked.includes(res) && !this.currentQuestion.result.multipleAnswer.includes(res)) {
            return 'error'
          }
        }
        return ''
      }
    },
    isDisabled () {
      if (this.currentQuestion?.detail?.type === 1 && this.radio + '') {
        return false
      }
      if (this.currentQuestion?.detail?.type === 2 && this.checked.length) {
        return false
      }
      if (this.currentQuestion?.detail?.type === 3 && this.txtValue) {
        return false
      }
      return true
    }
  },
  watch: {
    radio () {
      this.$emit('changRedio', this.currentRadio)
    },
    isDisabled (newVal) {
      this.$emit('changDisabled', newVal)
    },
    checked () {
      this.$emit('changChecked', this.currentChecked)
    }
  },
  filters: {
    showOption (value) {
      switch (value) {
        case 0:
          return 'A'
          break;
        case 1:
          return 'B'
          break;
        case 2:
          return 'C'
          break;
        case 3:
          return 'D'
          break;
        default:
          return ''
          break;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.inner-content {
  padding: 15px;
  .content-title {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #181a39;
    line-height: 24px;
  }
  .content-tags {
    margin-top: 12px;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      display: flex;
      li {
        margin: 0 10px;
        padding: 6px;
        font-size: 14px;
        color: #b4b4bd;
        background: #f7f4f5;
        border-radius: 3px;
        flex-shrink: 0;
      }
    }
  }
  .content-option {
    margin-top: 30px;
    padding: 0 10px;
    .option-item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 8px 0;
      padding-right: 35px;
      margin-bottom: 16px;
      padding-left: 15px;
      background: #ffffff;
      border: 1px solid transparent;
      border-radius: 4px;
      font-size: 16px;
      color: #181a39;
      &[aria-checked='true'] {
        border-color: #eeeeee;
      }
      .iconfont {
        position: absolute;
        top: 50%;
        right: 10px;
        margin-top: -12px;
        width: 25px;
        height: 25px;
        font-size: 25px;
        display: none;
      }
      &.error {
        background: #ffefea;
        .iconicon_cuowu {
          display: block;
          color: #ff4949;
        }
        .iconicon_zhengque {
          display: none;
        }
      }
      &.success {
        background: #ddfad9;
        color: #1dc779;
        /deep/ .van-checkbox__label {
          color: #1dc779;
        }
        .iconicon_cuowu {
          display: none;
        }
        .iconicon_zhengque {
          display: block;
          color: #1dc779;
        }
      }
    }
    .textarea-box {
      height: 150px;
      textarea {
        width: 100%;
        height: 100%;
        border: 1px solid #eee;
        font-size: 16px;
        padding: 10px;
        &:focus::placeholder {
          opacity: 0;
        }
      }
    }
  }
  .line {
    height: 1px;
    margin: 20px 0;
    background: #eceaea;
  }
}
</style>