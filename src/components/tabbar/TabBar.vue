<template>
  <van-tabbar active-color="#f00" route v-model="active">
    <van-tabbar-item to="/company">
      公司
      <template #icon>
        <i class="iconfont icon iconicon_footbar_gs_sel"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/subject">
      刷题
      <template #icon>
        <i class="iconfont icon iconicon_footbar_st_sel"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/find">
      发现
      <template #icon>
        <i class="iconfont icon iconicon_footbar_fx_sel"></i>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/profile">
      我的
      <template #icon>
        <i class="iconfont icon iconicon_footbar_wode_nor"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>
.icon {
  font-size: 30px;
}
</style>