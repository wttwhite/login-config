<template>
  <div class="page-right">
    <packageInfoVue
      v-bind="$attrs"
      v-on="$listeners"
      v-show="showRightPanel === 'packageInfo'"
    />
    <pageInfoVue
      v-bind="$attrs"
      v-on="$listeners"
      v-show="showRightPanel === 'pageInfo'"
    />
  </div>
</template>
<script>
import packageInfoVue from './package-info.vue'
import pageInfoVue from './page-info.vue'
import { mapState } from 'vuex'
export default {
  name: 'page-right',
  components: { packageInfoVue, pageInfoVue },
  computed: {
    ...mapState({
      showRightPanel: (state) => state.pageConfig.showRightPanel,
    }),
  },
  watch: {
    // '$store.state.pageConfig.showRightPanel'(n) {
    //   console.log('nnnnnn', n)
    // },
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
