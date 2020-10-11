<template>
  <div class="find-technic">
    <find-title title="面试技巧" />
    <div class="main">
      <technic v-bind="$attrs" />
    </div>
  </div>
</template>

<script>
import FindTitle from './FindTitle'
import Technic from 'components/technic/Technic'

export default {
  name: 'FindTechnic',
  components: {
    FindTitle,
    Technic
  }
}
</script>

<style scoped lang="scss">
.find-technic {
  padding: 15px;
  background: #ffffff;
}
</style>