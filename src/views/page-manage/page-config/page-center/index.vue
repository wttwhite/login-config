<template>
  <div class="page-center" @click.prevent.stop="pageCenterClick">
    <div class="container" :style="computedRect">
      <iframe
        style="width: 100%; height: 100%"
        ref="iframeref"
        src="/#/page-manage/config/container"
      >
      </iframe>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'page-center',
  props: {
    pageInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
    packageInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    computedRect() {
      const { scale, width, height, bgColor } = this.pageInfo
      return {
        width: width + 'px',
        height: height + 'px',
        background: bgColor,
        transform: `scale(${scale / 100})`,
      }
    },
  },
  watch: {
    packageInfo: {
      handler(n) {
        // 向iframe发送数据
        n.key &&
          this.$refs.iframeref.contentWindow.postMessage({
            type: 'change-current-packageInfo',
            item: {
              ...JSON.parse(JSON.stringify(n)),
            },
          })
      },
      deep: true,
    },
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    window.addEventListener('message', this.getIframeData)
  },
  destroyed() {
    window.removeEventListener('message', this.getIframeData)
  },
  methods: {
    async dragendSingle(item) {
      const { data } = await axios.get(item.packageUrl)
      const singlePackage = {
        ...item,
        package: data,
        name: data.name,
        width: data.config.width,
        height: data.config.height,
        active: true,
        key: data.name + new Date().getTime(), // 支持多次拖拽相同组件
      }

      this.list.push({ ...singlePackage }) // 缓存，用于修改值
      // 向iframe发送数据
      this.$refs.iframeref.contentWindow.postMessage({
        type: 'dragend-single',
        item: singlePackage,
      })
    },
    getIframeData(event) {
      this.getIframePackage(event)
      this.getIframeShowPanel(event)
    },
    // 获取拖拽之后的数据
    getIframePackage(event) {
      const { type, data } = event.data
      if (type !== 'changeCurrPackageInfoMessage' || !data) return
      let packageInfo = {}
      // 同时要修改list缓存
      this.list.forEach(async (item, index) => {
        if (item.key === data.key) {
          const params = { ...item, ...data }
          if (item.config && !item.configComponent) {
            const configComponent = await axios.get(item.config)
            params.configComponent = configComponent
          }
          packageInfo = params
          this.$set(this.list, index, params)
          this.$emit('update-allList', this.list)
          this.$emit('update-currPackageInfo', packageInfo)
        }
      })
    },
    // 获取组件面板操作显示
    getIframeShowPanel(event) {
      const { type, data } = event.data
      if (type !== 'change-rightPanel' || !data) return
      this.$emit('update-show-panel', data)
    },
    // 点击页面配置
    pageCenterClick() {
      this.$emit('update-show-panel', 'pageInfo')
    },
  },
}
</script>
<style lang="scss" scoped>
.page-center {
  background-color: rgb(213, 215, 219);
  flex: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .container {
    background-color: #fff;
    flex-shrink: 0;
    position: relative;
  }
  .vue-draggable-class {
    cursor: pointer;
  }
}
</style>
