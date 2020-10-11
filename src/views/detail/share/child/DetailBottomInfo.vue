<template>
  <div class="report">
    <div class="input-box" @click="inputClick">我来补充两句</div>
    <div class="icon-list">
      <div class="icon-item star" @click="iconCollectClick(articleInfo.id)">
        <van-icon name="star-o" :class="{active: isCollect}" />
        <span>{{ articleInfo.collect ? articleInfo.collect : 0 }}</span>
      </div>
      <div class="icon-item good-job" @click="iconStarClick(articleInfo.id)">
        <van-icon name="good-job-o" :class="{active: isStarArticle}" />
        <span>{{ articleInfo.star ? articleInfo.star : 0 }}</span>
      </div>
      <div class="icon-item share">
        <van-icon name="share-o" />
        <span>{{ articleInfo.share ?  articleInfo.share : 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DetailBottomInfo',
  props: {
    articleInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    isCollect: {
      type: Boolean,
      default: false
    },
    isStarArticle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    inputClick () {
      this.$emit('openPopup')
    },
    iconStarClick (id) {
      this.$emit('iconStarToggle', id)
    },
    iconCollectClick (id) {
      this.$emit('iconCollectToggle', id)
    }
  }
}
</script>

<style scoped lang="scss">
.report {
  position: fixed;
  left: 0;
  right: 0;
  bottom: -2px;
  display: flex;
  align-items: center;
  padding: 10px 15px 20px;
  background: #fff;
  .input-box {
    flex: 1;
    height: 34px;
    padding-left: 8px;
    margin-right: 12px;
    background: #f7f4f5;
    border-radius: 4px;
    font-size: 14px;
    color: #b4b4bd;
    line-height: 34px;
  }
  .icon-list {
    display: flex;
    .icon-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 0 12px;
      span {
        font-size: 14px;
        color: #b4b4bd;
      }
      .active {
        color: red;
      }
    }
  }
}
</style>