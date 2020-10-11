import Vue from 'vue'
import Vuex from 'vuex'

import { getInfo } from 'network/info'
import { Toast } from 'vant'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    setStarArticle(state, payload) {
      state.userInfo.starArticles = payload
    },
    setCollectArticle(state, payload) {
      state.userInfo.collectArticles = payload
    },
    setStarComment(state, payload) {
      state.userInfo.starComments = payload
    },
    setCollectQuestion(state, payload) {
      state.userInfo.collectQuestions = payload
    }
  },
  actions: {
    async setUserInfo(context) {
      try {
        const res = await getInfo()
        res.data.avatar = process.env.VUE_APP_BASEURL + res.data.avatar
        context.commit('setUserInfo', res.data)
      } catch (error) {
        Toast.fail(error.message)
      }
    }
  },
  modules: {}
})
