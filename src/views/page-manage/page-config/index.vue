<template>
  <div>
    <pageTopVue
      :pageInfo="pageInfo"
      @update-pageInfo="topChangePageInfo"
      @preview-click="previewClick"
      @save-click="saveClick"
    />
    <div class="config-container">
      <pageLeftVue @dragend="dragend" />
      <pageCenterVue ref="pageCenterVue" :pageInfo="pageInfo" />
      <pageRightVue :pageInfo="pageInfo" />
    </div>
  </div>
</template>
<script>
import pageTopVue from './page-top'
import pageLeftVue from './page-left'
import pageCenterVue from './page-center'
import pageRightVue from './page-right'
import { mapState } from 'vuex'
export default {
  name: 'page-config',
  components: { pageTopVue, pageLeftVue, pageCenterVue, pageRightVue },
  computed: {
    ...mapState({
      pageInfo: (state) => state.pageConfig.pageInfo,
    }),
  },
  data() {
    return {}
  },
  created() {
    this.getPageDetail()
    console.log('$store.state', this.$store.state)
  },
  methods: {
    // top event
    topChangePageInfo(info) {
      this.$store.commit('changePageInfo', info)
    },
    previewClick() {
      localStorage.setItem(
        'allPackages',
        JSON.stringify(this.$store.state.pageConfig.configList)
      )
      localStorage.setItem(
        'pageInfo',
        JSON.stringify(this.$store.state.pageConfig.pageInfo)
      )
      let routeUrl = this.$router.resolve({
        name: 'page-manage-preview',
      })
      window.open(routeUrl.href, '_blank')
    },
    saveClick() {},
    // top event end
    dragend(item, e, startE) {
      const centerLeft = this.$refs.pageCenterVue.$el.offsetLeft
      const centerTop = this.$refs.pageCenterVue.$el.offsetTop
      this.$nextTick(() => {
        this.$refs.pageCenterVue.dragendSingle({
          ...item,
          x: e.x - centerLeft - startE.x,
          y: e.y - centerTop - startE.y,
        })
      })
    },
    getPageDetail() {
      this.$store.dispatch('getPageInfo')
    },
  },
}
</script>
<style lang="scss" scoped>
.config-container {
  height: calc(100% - 64px);
  display: flex;
}
</style>
