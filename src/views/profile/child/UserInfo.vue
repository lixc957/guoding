<template>
  <div class="user-info">
    <div class="info-box">
      <div class="left">
        <div class="user-name">{{ userInfo.nickname }}</div>
        <p class="qianming">{{ userInfo.intro }}</p>
      </div>
      <div class="right">
        <div class="user-icon" @click="$router.push('/info')">
          <img :src="userInfo.avatar" alt="" />
        </div>
      </div>
    </div>
    <div class="question">
      <ul>
        <li class="question-item">
          <div class="count">{{ userInfo.submitNum }}</div>
          <div class="word">累计答题</div>
        </li>
        <li class="question-item">
          <div class="count">{{ userInfo.collectQuestions.length }}</div>
          <div class="word">收藏题目</div>
        </li>
        <li class="question-item">
          <div class="count">{{ userInfo.errorNum }}</div>
          <div class="word">我的错题</div>
        </li>
        <li class="question-item">
          <div class="count">
            {{
              (
                ((userInfo.submitNum - userInfo.errorNum) /
                  userInfo.submitNum) *
                100
              ).toFixed(0) + '%'
            }}
          </div>
          <div class="word">正确率</div>
        </li>
      </ul>
    </div>
    <div class="job">
      <van-cell
        title="我的岗位"
        is-link
        :value="userInfo.position"
        @click="$router.push('/info/edit?prototype=position')"
      >
        <template #icon>
          <i class="iconfont iconicon_mine_gangwei icon"></i>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserInfo',
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="scss">
.user-info {
  position: relative;
  height: 210px;
  padding: 10px 15px 0 15px;
  background: linear-gradient(45deg, #ce0031, #b8002c);
  .info-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      font-size: 21px;
      font-family: PingFangSC, PingFangSC-Semibold;
      color: #ffffff;
      line-height: 50px;
    }
    .qianming {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #cccccc;
    }
    .right {
      align-self: flex-end;
      .user-icon {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.38);
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .question ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    li {
      flex: 1;
      text-align: center;
      .count {
        font-size: 21px;
        font-family: Helvetica;
        color: #ffffff;
        line-height: 30px;
      }
      .word {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        color: #cccccc;
      }
    }
  }
  .job {
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: -10px;
    border-radius: 8px;
    overflow: hidden;
    .van-cell {
      padding: 16px;
      font-size: 16px;
      .van-cell__title {
        padding-left: 12px;
        color: #181a39;
      }
    }
    .icon {
      margin-top: -1px;
      font-size: 24px;
      color: #181a39;
    }
  }
}
</style>