<template>
  <div class="find-share">
    <find-title title="面经分享" />
    <share v-bind="$attrs" />
  </div>
</template>

<script>
import FindTitle from './FindTitle'
import Share from 'components/share/Share'

export default {
  name: 'FindShare',
  components: {
    FindTitle,
    Share
  }
}
</script>

<style scoped>
.find-share {
  margin-top: 10px;
  padding: 15px;
  background: #ffffff;
}
</style>