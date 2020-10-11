import { Toast } from 'vant'

export function tipsLoading(message) {
  return Toast.loading({
    duration: 0,
    message,
    forbidClick: true,
    loadingType: 'spinner'
  })
}

export function setToken(key, value) {
  window.localStorage.setItem(key, value)
}

export function getToken(key) {
  return window.localStorage.getItem(key)
}

export function removeToken(key) {
  window.localStorage.removeItem(key)
}