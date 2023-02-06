<template>
  <div>
    <pageTopVue
      :pageInfo="pageInfo"
      @update-pageInfo="
        (val) => {
          this.pageInfo = { ...this.pageInfo, ...val }
        }
      "
      @preview-click="previewClick"
      @save-click="saveClick"
    />
    <div class="config-container">
      <pageLeftVue @dragend="dragend" />
      <pageCenterVue
        ref="pageCenterVue"
        :pageInfo="pageInfo"
        :packageInfo="packageInfo"
        @update-currPackageInfo="updateCurrPackageInfo"
        @update-allList="updateAllList"
        @update-show-panel="(val) => (this.show = val)"
      />
      <pageRightVue
        :show="show"
        :pageInfo="pageInfo"
        @update-pageInfo="
          (val) => {
            this.pageInfo = { ...this.pageInfo, ...val }
          }
        "
        :packageInfo="packageInfo"
        @update-currPackageInfo="updateCurrPackageInfo"
      />
    </div>
  </div>
</template>
<script>
import pageTopVue from './page-top'
import pageLeftVue from './page-left'
import pageCenterVue from './page-center'
import pageRightVue from './page-right'
export default {
  name: 'page-config',
  components: { pageTopVue, pageLeftVue, pageCenterVue, pageRightVue },
  data() {
    return {
      show: 'pageInfo', //pageInfo显示页面配置 ||  packageInfo显示组件配置
      pageInfo: {
        pageName: '主题',
        scale: 50,
      },
      packageInfo: {},
      allList: [],
    }
  },
  created() {
    this.getPageDetail()
  },
  methods: {
    updateCurrPackageInfo(n) {
      this.packageInfo = n
    },
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
    updateAllList(list) {
      this.allList = list
    },
    previewClick() {
      localStorage.setItem('allPackages', JSON.stringify(this.allList))
      localStorage.setItem('pageInfo', JSON.stringify(this.pageInfo))
      let routeUrl = this.$router.resolve({
        name: 'page-manage-preview',
      })
      window.open(routeUrl.href, '_blank')
    },
    saveClick() {},
    getPageDetail() {},
  },
}
</script>
<style lang="scss" scoped>
.config-container {
  height: calc(100% - 64px);
  display: flex;
}
</style>
