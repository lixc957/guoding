<template>
  <div class="profile" v-if="$store.state.userInfo.nickname">
    <scroll
      ref="scroll"
      class="profile-content"
      :probe-type="3"
    >
      <user-info />
      <data-total />
      <list-view /> 
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/scroll/Scroll'
import UserInfo from './child/UserInfo'
import DataTotal from './child/DataTotal'
import ListView from './child/ListView'

export default {
  name: 'Profile',
  components: {
    Scroll,
    UserInfo,
    DataTotal,
    ListView
  }
}
</script>

<style scoped>
.profile {
  height: 100%;
}
.profile-content {
  height: 100%;
}
</style>