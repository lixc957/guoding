<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <i class="iconfont iconbtn_nav_back nav-back" @click="back"></i>
      </template>
    </van-nav-bar>
    <div class="login-body">
      <h3>您好，请登录</h3>
      <div class="login-form">
        <van-form ref="form" @submit="userLogin">
          <van-field
            v-model="userInfo.mobile"
            name="mobile"
            placeholder="请输入手机号"
            type="tel"
            :rules="rules.mobile"
            autocomplete="off"
            class="input-item"
          >
            <template #left-icon>
              <i class="iconfont iconbianzu1 icon"></i>
            </template>
          </van-field>
          <hr style="border-color: #181A39" />
          <van-field
            v-model="userInfo.code"
            placeholder="请输入验证码"
            name="code"
            :rules="rules.code"
            autocomplete="off"
            class="input-item"
          >
            <template #left-icon>
              <i class="iconfont iconyanzhengma icon"></i>
            </template>
            <template #button>
              <button
                @click.stop="getCode"
                :disabled="timer !== 6"
                type="button"
              >
                {{ timer !== 6 ? timer + 'S后重试' : '获取验证码' }}
              </button>
            </template>
          </van-field>
          <van-checkbox v-model="isAgree" shape="square" class="agree">
            登录即同意
            <span>《用户使用协议》</span>和
            <span>《隐私协议》</span>
          </van-checkbox>
          <van-button
            round
            block
            type="danger"
            native-type="submit"
            class="btnSure"
            :disabled="!isAgree"
          >
            确定
          </van-button>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserCode, userLogin } from 'network/login'
import { tipsLoading, setToken, getToken } from 'common/utils'

export default {
  name: 'Login',
  data () {
    return {
      isAgree: false,
      userInfo: {
        mobile: 18888881111,
        code: ''
      },
      timer: 6,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onBlur' },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号',
            trigger: 'onBlur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'onBlur' },
          {
            pattern: /^\d{4}$/,
            message: '请输入有效的验证码',
            trigger: 'onBlur'
          }
        ]
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (getToken('token')) {
      return next('/profile')
    }
    next()
  },
  methods: {
    /**
     * 	网路请求相关方法
     */
    async getCode () {
      try {
        await this.$refs.form.validate('mobile')
        tipsLoading('获取中...')
        const res = await getUserCode(this.userInfo.mobile)
        this.countDown()
        this.$toast.success(res.data)
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    async userLogin () {
      try {
        tipsLoading('登录中...')
        const res = await userLogin(this.userInfo)
        setToken('token', res.data.jwt)
        this.$toast.success('登录成功')
        res.data.user.avatar = process.env.VUE_APP_BASEURL + res.data.user.avatar
        this.$store.commit('setUserInfo', res.data.user)
        // 获取路由参数
        const redirect = this.$route.query.redirect
        if (redirect) this.$router.push(redirect)
        else this.$router.push('/profile')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },
    /**
  * 	事件相关方法
  */
    countDown () {
      this.timer--
      const timerId = setInterval(() => {
        this.timer--
        if (this.timer === 0) {
          clearInterval(timerId)
          this.timer = 6
        }
      }, 1000)
    },
    back () {
      try {
        const redirect = this.$route.query.redirect
        if (redirect) this.$router.push('/find')
        else this.$router.back()
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
$textColor: #00b8d4;
.login {
  height: 100vh;
  background: #fff;
  /deep/ .van-nav-bar__left {
    padding-left: 0;
    .nav-back {
      font-size: 44px;
    }
  }
  .login-body {
    padding: 0 15px;
    margin-top: 50px;
    h3 {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: #222222;
      line-height: 25px;
    }
    /deep/ .login-form {
      margin-top: 60px;
      .input-item {
        padding: 10px 0;
        .van-cell__value--alone {
          padding-left: 10px;
          color: #222222;
          // 文本框
          .van-field__control {
            font-size: 14px;
            color: #181a39;
            &::placeholder {
              color: #b4b4bd;
            }
          }
          // 按钮
          .van-field__button button {
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: $textColor;
            border: 0;
            outline: 0;
            background: transparent;
          }
        }
        .icon {
          color: #222222;
        }
      }
      // 复选框
      .agree {
        margin: 25px 0;
        font-size: 12px;
        .van-checkbox__label {
          color: #181a39;
          > span {
            color: $textColor;
          }
        }
      }
      // 确定按钮
      .btnSure {
        height: 44px;
        font-size: 18px;
      }
    }
  }
}
</style>