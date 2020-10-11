<template>
  <div class="info" v-if="userInfo.nickname">
    <van-nav-bar title="我的资料">
      <template #left>
        <i
          class="iconfont iconbtn_nav_back nav-back"
          @click="$router.back()"
        ></i>
      </template>
    </van-nav-bar>
    <div class="user-icon">
      <van-cell title="头像" is-link @click="$router.push('/info/edit?prototype=avatar')">
        <template #default>
          <img :src="userInfo.avatar" alt="" />
        </template>
      </van-cell>
    </div>
    <div class="info-list">
      <van-cell-group class="cell-group">
        <van-cell
          title="昵称"
          is-link
          :value="userInfo.nickname"
          @click="$router.push('/info/edit?prototype=nickname')"
        >
        </van-cell>
        <van-cell
          title="性别"
          is-link
          :value="columns[userInfo.gender]"
          @click="genderShow = true"
        >
        </van-cell>
        <van-cell
          title="地区"
          is-link
          :value="areaList.city_list[userInfo.area]"
          @click="areaShow = true"
        >
        </van-cell>
        <van-cell
          title="个人简介"
          is-link
          :value="userInfo.intro"
          @click="$router.push('/info/edit?prototype=intro')"
        >
        </van-cell>
      </van-cell-group>
    </div>
    <div class="btn-exit">
      <van-button plain type="info" size="large" @click="exit"
        >退出登录</van-button
      >
    </div>
    <!-- 性别 -->
    <van-popup
      v-model="genderShow"
      position="bottom"
      :style="{ height: '30%' }"
      :close-on-click-overlay="false"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        title="性别"
        @confirm="saveGender"
        @cancel="genderShow = false"
        :default-index="userInfo.gender"
      />
    </van-popup>
    <!-- 地区 -->
    <van-popup
      v-model="areaShow"
      position="bottom"
      :style="{ height: '30%' }"
      :close-on-click-overlay="false"
    >
      <van-area
        title="地区"
        :area-list="areaList"
        :columns-num="2"
        :value="userInfo.area"
        @cancel="areaShow = false"
        @confirm="saveArea"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { editInfo } from 'network/info'
import { tipsLoading, removeToken } from 'common/utils'
import areaList from 'common/area'

export default {
  name: 'Info',
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      genderShow: false,
      columns: ['未知', '男孩子', '女孩子'],
      areaShow: false,
      areaList
    }
  },
  methods: {
    async saveGender (value, index) {
      try {
        tipsLoading('修改中')
        await editInfo({ gender: index })
        this.$store.dispatch('setUserInfo')
        this.genderShow = false
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    async saveArea (data) {
      try {
        const code = data[1].code
        tipsLoading('修改中')
        await editInfo({ area: code })
        this.$store.dispatch('setUserInfo')
        this.areaShow = false
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    // 退出登录
    exit () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '您确定要退出吗？'
      })
        .then(() => {
          removeToken('token')
          this.$store.commit('removeUserInfo')
          this.$toast.success('退出成功')
          this.$router.replace('/find')
        })
        .catch(() => { })
    }
  }
}
</script>

<style scoped lang="scss">
.info {
  height: 100vh;
  background: #f7f4f5;
  /deep/ .van-nav-bar__left {
    padding-left: 0;
    .nav-back {
      font-size: 44px;
    }
  }
  /deep/ .van-nav-bar__title {
    font-size: 18px;
    color: #222;
  }
  .user-icon {
    padding: 15px;
    .van-cell {
      display: flex;
      align-items: center;
      border-radius: 8px;
      .van-cell__title {
        font-size: 16px;
        color: #181a39;
      }
      i.van-icon.van-icon-arrow.van-cell__right-icon {
        margin-left: 8px;
        font-size: 20px;
        color: #545671;
      }
      .van-cell__value img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
  .info-list {
    padding: 15px;
    padding-top: 0;
    .cell-group {
      border-radius: 8px;
      overflow: hidden;
      .van-cell {
        padding: 14px 16px;
        .van-cell__title {
          font-size: 16px;
          color: #181a39;
        }
        i.van-icon.van-icon-arrow.van-cell__right-icon {
          margin-left: 8px;
          font-size: 20px;
          color: #545671;
        }
        .van-cell__value {
          color: #5b5d75;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .btn-exit {
    padding: 15px;
    padding-top: 0;
    button.van-button.van-button--info.van-button--large.van-button--plain {
      border-radius: 8px;
      border: 1px solid transparent;
      color: #e40137;
    }
  }
  /deep/ .van-picker__toolbar button {
    font-size: 16px;
  }
  /deep/ .van-picker__title {
    font-size: 18px;
  }
}
</style>