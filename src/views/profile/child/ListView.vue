<template>
  <div class="profile-list">
    <van-cell-group class="cell-group">
      <van-cell title="我的面经分享" is-link value="23">
        <template #icon>
          <i class="iconfont iconicon_mine_mianjing icon"></i>
        </template>
      </van-cell>
      <van-cell title="我的消息" is-link value="19">
        <template #icon>
          <i class="iconfont iconicon_mine_xiaoxi icon"></i>
        </template>
      </van-cell>
      <van-cell title="收藏的题库" is-link value="33">
        <template #icon>
          <i class="iconfont iconicon_mine_tikushoucang icon"></i>
        </template>
      </van-cell>
      <van-cell title="收藏的企业" is-link value="9">
        <template #icon>
          <i class="iconfont iconicon_mine_qiyeshoucang icon"></i>
        </template>
      </van-cell>
      <van-cell title="我的错题" is-link :value="userInfo.errorNum">
        <template #icon>
          <i class="iconfont iconicon_mine_cuoti icon"></i>
        </template>
      </van-cell>
      <van-cell title="收藏的面试经验" is-link value="12">
        <template #icon>
          <i class="iconfont iconxingxing2 icon"></i>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ListView',
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="scss">
.profile-list {
  padding: 0 15px 20px;
  .cell-group {
    border-radius: 8px;
    overflow: hidden;
    .van-cell {
      padding: 16px 16px;
      font-size: 16px;
      .van-cell__title {
        text-indent: 12px;
        color: #181a39;
      }
      .icon {
        margin-top: -1px;
        font-size: 24px;
        color: #181a39;
      }
    }
  }
}
</style>