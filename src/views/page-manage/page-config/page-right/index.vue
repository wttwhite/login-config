<template>
  <div class="page-right">
    <packageInfoVue
      v-bind="$attrs"
      v-on="$listeners"
      v-if="show === 'packageInfo'"
    />
    <pageInfoVue
      v-bind="$attrs"
      v-on="$listeners"
      v-show="show === 'pageInfo'"
    />
  </div>
</template>
<script>
import packageInfoVue from './package-info.vue'
import pageInfoVue from './page-info.vue'
export default {
  name: 'page-right',
  components: { packageInfoVue, pageInfoVue },
  props: {
    show: {
      type: String,
      default: 'pageInfo',
    },
  },
}
</script>
<style lang="scss" scoped>
.page-right {
  background-color: #f2f3f5;
  width: 290px;
  flex-shrink: 0;
  height: 100%;
}
</style>
