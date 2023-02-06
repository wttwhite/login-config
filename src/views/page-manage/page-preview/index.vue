<template>
  <div class="page-full-screen" ref="fullScreen">
    <el-scrollbar class="full">
      <div class="preview-box" :style="computedStyle">
        <div
          v-for="item in list"
          :key="item.name"
          :style="{
            position: 'absolute',
            width: item.width + 'px',
            height: item.height + 'px',
            left: item.x + 'px',
            top: item.y + 'px',
          }"
        >
          <component
            :is="item.component"
            :config="item.package.config"
          ></component>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import axios from 'axios'
let ResizeObserverIns = null
export default {
  name: 'page-preview',
  computed: {
    computedStyle() {
      const { bgColor, width, height } = this.pageInfo
      return {
        background: bgColor || '#fff',
        width: width + 'px',
        height: height + 'px',
        transform: `scale(${this.scale})`,
        'transform-origin': '0 0',
      }
    },
  },
  data() {
    return {
      list: [],
      pageInfo: {},
      scale: 1,
    }
  },
  created() {
    this.getData()
    this.getPageConfigData()
  },
  mounted() {
    this.screenResize()
    ResizeObserverIns = new ResizeObserver(() => {
      this.screenResize()
    })
    ResizeObserverIns.observe(this.$refs.fullScreen)
  },
  beforeDestroy() {
    ResizeObserverIns && ResizeObserverIns.disconnect()
  },
  methods: {
    async getPageConfigData() {
      const pageInfo = JSON.parse(localStorage.getItem('pageInfo'))
      this.pageInfo = pageInfo
    },
    async getData() {
      const packageList = JSON.parse(localStorage.getItem('allPackages'))
      packageList.forEach((item) => {
        this.getSinglePackageData(item)
      })
    },
    async getSinglePackageData(item) {
      const jsData = await axios.get(item.js)
      item.component = eval(jsData.data).default
      this.list.push(item)
    },
    screenResize() {
      const originWidth = this.pageInfo.width || 1920
      this.scale = this.$refs.fullScreen.offsetWidth / originWidth
    },
  },
}
</script>
<style lang="scss" scoped>
.full {
  width: 100%;
  height: 100%;
}
.page-full-screen {
  overflow: hidden;
  ::v-deep .el-scrollbar__wrap {
    height: calc(100% + 10px);
  }
  ::v-deep .el-scrollbar__view {
    height: 100%;
  }
}
.preview-box {
  position: relative;
  flex-shrink: 0 !important;
}
</style>
