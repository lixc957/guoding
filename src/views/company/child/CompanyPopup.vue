<template>
  <van-popup v-model="openPopup" position="top">
    <div class="conpany-popup-find">
      <div class="distance-box ">
        <div class="distance-title">距离</div>
        <ul>
          <li :class="{ active: companyData.distance === 'desc' }" @click="distanceClick('desc')">由远及近</li>
          <li :class="{ active: companyData.distance === 'asc' }" @click="distanceClick('asc')">由近及远</li>
        </ul>
      </div>
      <div class="score-box">
        <div class="score-title">评分</div>
        <ul>
          <li 
            v-for="(item, index) in rangeList" 
            :key="index" 
            :class="{ active: companyData.scoreRange === item.value }"
            @click="scoreClick(item.value)"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
      <div class="conpany-popup-btns">
        <van-button class="canBtn" color="#ffe2e9" @click="clearClick">清除</van-button>
        <van-button class="sureBtn" type="danger" @click="sureClick">确定</van-button>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'CompanyPopup',
  props: {
    companyData: {
      type: Object,
      default () {
        return {}
      }
    },
    rangeList: {
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
  watch: {
    openPopup (newVal) {
      this.$emit('isShowBanner', newVal)
    }
  },
  methods: {
    distanceClick(value) {
      this.$emit('distanceClick', value)
    },
    scoreClick(value) {
      this.$emit('scoreClick', value)
    },
    clearClick() {
      this.$emit('clearClick')
    },
    sureClick() {
      this.$emit('sureClick')
    }
  }
}
</script>

<style scoped lang="scss">
.conpany-popup-find {
  padding: 0 15px;
  margin-bottom: 20px;
  .distance-box,
  .score-box {
    margin-top: 20px;
    .distance-title,
    .score-title {
      font-size: 18px;
      font-weight: 700;
      color: #222222;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: 18px;
      li {
        width: 48%;
        text-align: center;
        background: #f9f8f8;
        border-radius: 4px;
        padding: 8px 0;
        font-size: 14px;
        border: 1px solid transparent;
        &:nth-child(2n + 1) {
          margin-right: 4%;
        }
        &.active {
          background: #ffe2e9;
          border: 1px solid #e40137;
          color: #e40137;
        }
      }
    }
  }
  .score-box ul li {
    margin-bottom: 9px;
  }
  .conpany-popup-btns {
    display: flex;
    margin-top: 30px;
    .canBtn {
      border-radius: 5px;
      flex: 1;
      margin-right: 10px;
      /deep/ span.van-button__text {
        color: red;
      }
    }
    .sureBtn {
      border-radius: 5px;
      flex: 2;
    }
  }
}
</style>