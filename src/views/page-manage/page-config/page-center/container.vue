<template>
  <div class="page-center-container" @click.prevent.stop="pageCenterClick">
    <vue-draggable-resizable
      v-for="item in list"
      :key="item.key"
      :w="item.width"
      :h="item.height"
      :x="item.x"
      :y="item.y"
      :z="1"
      :active="item.active"
      :snap="true"
      :snapTolerance="10"
      @refLineParams="getRefLineParams"
      :debug="false"
      parent
      @dragstop="onDragstop(arguments, item)"
      @resizestop="onResizestop(arguments, item)"
      @activated="onActivated(item)"
      @click.native.prevent.stop="onActivated(item)"
      class="vue-draggable-class"
    >
      <component
        :is="item.component"
        v-bind:config="item.package.config"
      ></component>
    </vue-draggable-resizable>
    <!--辅助线-->
    <span
      class="ref-line v-line"
      v-for="(item, index) in vLine"
      :key="index + 'vline'"
      v-show="item.display"
      :style="{
        left: item.position,
        top: item.origin,
        height: item.lineLength,
      }"
    ></span>
    <span
      class="ref-line h-line"
      v-for="(item, index) in hLine"
      :key="index"
      v-show="item.display"
      :style="{
        top: item.position,
        left: item.origin,
        width: item.lineLength,
      }"
    ></span>
    <!--辅助线END-->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'page-center-container',
  data() {
    return {
      list: [],
      vLine: [],
      hLine: [],
    }
  },
  mounted() {
    window.addEventListener('message', this.getFatherData)
  },
  destroyed() {
    window.removeEventListener('message', this.getFatherData)
  },
  methods: {
    async getFatherData(event) {
      this.getDragendData(event)
      this.getRightPackageInfoChange(event)
    },
    async getDragendData(event) {
      const { item, type } = event.data
      if (!item || type !== 'dragend-single') return
      const jsData = await axios.get(item.js)
      const singlePackage = {
        ...item,
        component: eval(jsData.data).default,
      }
      this.list.push(singlePackage)
      this.changeData(singlePackage)
    },
    getRightPackageInfoChange(event) {
      const { item, type } = event.data
      if (!item || type !== 'change-current-packageInfo') return
      this.list.forEach((listItem, index) => {
        if (listItem.key === item.key) {
          this.$set(this.list, index, {
            ...item,
            component: listItem.component,
          })
        }
      })
    },
    changeData(item) {
      const data = { ...item }
      // postMessage不能传dom数据
      delete data.component
      parent.window.postMessage({
        type: 'changeCurrPackageInfoMessage',
        data: JSON.parse(JSON.stringify(data)),
      })
      parent.window.postMessage({
        type: 'change-rightPanel',
        data: 'packageInfo',
      })
    },
    // 每当组件停止拖动时调用
    onDragstop([x, y], item) {
      item.x = x
      item.y = y
      this.changeData(item)
    },
    // 每当组件停止调整大小时调用
    onResizestop([x, y, width, height], item) {
      item.x = x
      item.y = y
      item.width = width
      item.height = height
      this.changeData(item)
    },
    // 单击组件时调用，以显示句柄。无出参；备注：句柄就是点击组件后上下左右的可以拉伸的方块点
    onActivated(item) {
      console.log('onActivated', item)
      this.changeData(item)
    },
    // 点击页面配置
    pageCenterClick() {
      parent.window.postMessage({
        type: 'change-rightPanel',
        data: 'pageInfo',
      })
    },

    // 辅助线回调事件
    getRefLineParams(params) {
      const { vLine, hLine } = params
      this.vLine = vLine
      this.hLine = hLine
    },
  },
}
</script>
<style lang="scss" scoped>
.page-center-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .vue-draggable-class {
    cursor: pointer;
  }
}
</style>
