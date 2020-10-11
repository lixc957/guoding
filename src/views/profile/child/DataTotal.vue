<template>
  <div class="data-total">
    <div class="data-box">
      <h3>面经数据</h3>
      <div class="total">
        <ul>
          <li class="total-item">
            <p class="title">昨日阅读+{{ userInfo.shareData.read.yesterday }}</p>
            <div class="count">{{ userInfo.shareData.read.total }}</div>
            <div>阅读总数</div>
          </li>
          <li class="total-item">
            <p class="title">昨日获赞+{{ userInfo.shareData.star.yesterday }}</p>
            <div class="count">{{ userInfo.shareData.star.total }}</div>
            <div>获赞总数</div>
          </li>
          <li class="total-item">
            <p class="title">昨日新增+{{ userInfo.shareData.comment.yesterday }}</p>
            <div class="count">{{ userInfo.shareData.comment.total }}</div>
            <div>新增总数</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DataTotal',
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="scss">
.data-total {
  margin-top: 26px;
  margin-bottom: 10px;
  padding: 0 15px;
  .data-box {
    padding-top: 10px;
    width: 100%;
    height: 130px;
    background: #fff;
    border-radius: 8px;
    > h3 {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #181a39;
      padding-left: 15px;
      line-height: 40px;
    }
    .total ul {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 6px;
      li {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #545671;
        .title {
          color: #b4b4bd;
          font-size: 12px;
        }
        .count {
          color: #181a39;
          font-size: 20px;
          font-weight: 600;
          line-height: 36px;
        }
      }
    }
  }
}
</style>