<template>
  <div class="title">
    <h3>{{title}}</h3>
    <div class="look-more" @click="lookMore">
      查看更多<van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    lookMore() {
      if (this.title === '面经分享') {
        this.$router.push('/find/share')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  height: 30px;
  h3 {
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    color: #222222;
  }
  .look-more {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #5b5d75;
  }
}
</style>