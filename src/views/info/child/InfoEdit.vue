<template>
  <div class="info-edit" v-if="query">
    <van-nav-bar :title="title">
      <template #left>
        <i
          class="iconfont iconbtn_nav_back nav-back"
          @click="$router.back()"
        ></i>
      </template>
      <template #right>
        <span v-if="isSave" @click="saveInfo">保存</span>
      </template>
    </van-nav-bar>
    <div class="input-box">
      <van-field 
        v-model="value" 
        @input="isSave = true" 
        v-if="query !== 'avatar'" />
        <van-uploader 
          v-model="fileList"
          :after-read="afterRead"
          :max-count="1" 
          preview-size="200"
          v-else />
    </div>
  </div>
</template>

<script>
import { editInfo, upload } from 'network/info'
import { tipsLoading } from 'common/utils'

export default {
  name: 'InfoEdit',
  data() {
    return {
      title: '',
      query: this.$route.query.prototype,
      value: '',
      isSave: false,
      fileList: [
        {
          url: this.$store.state.userInfo.avatar
        }
      ]
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async saveInfo() {
      tipsLoading('修改中')
      await editInfo({[this.query]: this.value})
      this.$store.dispatch('setUserInfo')
      this.$toast.success('修改成功')
      this.$router.back()
    },
    async afterRead(file) {
      file.message = '上传中'
      file.status = 'uploading'
      const res = await upload(file.file)
      file.status = 'done'
      this.isSave = true
      this.value = res.data[0].id
    },
    getInfo() {
      if (this.query === 'nickname') {
        this.title = '修改昵称'
      } else if (this.query === 'intro') {
        this.title = '修改个人简介'
      } else if (this.query === 'position') {
        this.title = '修改岗位'
      } else if (this.query === 'avatar') {
        this.title = '修改头像'
      }   
      this.value = this.$store.state.userInfo[this.query]
    }  
  }
}
</script>

<style scoped lang="scss">
.info-edit {
  /deep/ .van-nav-bar__left {
    padding-left: 0;
    .nav-back {
      font-size: 44px;
    }
  }
  /deep/ .van-nav-bar__title {
    font-size: 18px;
    font-weight: 600;
  }
  /deep/ .van-nav-bar__right {
    font-size: 16px;
    padding-top: 1px;
  }
  .input-box {
    padding: 20px 15px;
    text-align: center;
    .van-cell {
      background: #F7F4F5;
      border-radius: 4px;
      font-size: 16px;
      color: #181a39;
    }
    .van-uploader {
      /deep/ .van-uploader__preview-delete {
        width: 20px;
        height: 20px;
        .van-uploader__preview-delete-icon {
          font-size: 22px;
        }
      }
      /deep/ .van-uploader__upload-icon {
        font-size: 40px;
      }
    }
  }
}
</style>