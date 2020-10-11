<template>
  <div class="home">
    <div class="home-header">
      <keep-alive exclude="Profile">     
        <router-view />
      </keep-alive>
    </div>
    <div class="home-footer">
      <tab-bar />
    </div>
  </div>
</template>

<script>
import TabBar from 'components/tabbar/TabBar'

export default {
  name: 'Home',
  components: {
    TabBar
  },
  beforeRouteEnter (to, from, next) {
    if (to.path === '/home') {
      return next('/company')
    }
    next()
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
}

.home-header {
  width: 100vw;
  height: calc(100vh - 50px);
  background: #F7F4F5;
}

.home-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
}
</style>