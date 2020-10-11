import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from 'views/login/Login'
import Home from 'views/home/Home'
import Company from 'views/company/Company'
const Subject = () =>
  import(/* webpackChunkName: 'subject' */ 'views/subject/Subject')
const SubjectInner = () =>
  import(/* webpackChunkName: 'subject' */ 'views/subject/InnerView')
const Find = () => import(/* webpackChunkName: 'find' */ 'views/find/Find')
const ShareList = () =>
  import(/* webpackChunkName: 'find' */ 'views/list/share/ShareList')
const Profile = () =>
  import(/* webpackChunkName: 'profile' */ 'views/profile/Profile')
const Info = () =>
  import(/* webpackChunkName: 'profile' */ 'views/info/Info')
const InfoEdit = () =>
  import(/* webpackChunkName: 'profile' */ 'views/info/child/InfoEdit') 
const SearchShare = () =>
  import(/* webpackChunkName: 'search' */ 'views/search/share/SearchShare')
const ShareDetail = () =>
  import(/* webpackChunkName: 'detail' */ 'views/detail/share/ShareDetail')

import { getToken } from 'common/utils'
import { Toast } from 'vant'
import { getInfo } from 'network/info'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/company'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/company',
        component: Company
      },
      {
        path: '/subject',
        component: Subject,
        meta: {
          needLogin: true
        }
      },
      {
        path: '/find',
        component: Find
      },
      {
        path: '/profile',
        component: Profile,
        meta: {
          needLogin: true
        }
      }
    ]
  },
  {
    path: '/info',
    component: Info,
    meta: {
      needLogin: true
    }
  },
  {
    path: '/info/edit',
    component: InfoEdit,
    meta: {
      needLogin: true
    }
  },
  {
    path: '/find/share',
    component: ShareList
  },
  {
    path: '/search/share',
    component: SearchShare
  },
  {
    path: '/detail/share/:id',
    component: ShareDetail,
    meta: {
      needLogin: true
    }
  },
  {
    path: '/subject/inter',
    component: SubjectInner,
    meta: {
      needLogin: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const { needLogin } = to.meta
  if (!needLogin) {
    // 不需要登录
    return next()
  }

  // 需要登录,判断是否有token
  const token = getToken('token')
  if (!token) {
    Toast.fail('请先登录')
    return next('/login?redirect=' + to.fullPath)
  }

  const { userInfo } = store.state
  if (userInfo.nickname) {
    next()
  } else {
    // 调取用户信息
    try {
      const res = await getInfo()
      res.data.avatar = process.env.VUE_APP_BASEURL + res.data.avatar
      store.commit('setUserInfo', res.data)
      next()
    } catch (error) {
      Toast.fail(error.message)
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
