<template>
  <div class="page-center" @click.prevent.stop="pageCenterClick">
    <div class="container" :style="computedRect">
      <iframe style="width: 100%; height: 100%">
        <vue-draggable-resizable
          v-for="item in list"
          :key="item.name"
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
          @dragging="onDragstop(arguments, item)"
          @resizing="onResizstop(arguments, item)"
          @activated="onActivated(item)"
          class="vue-draggable-class"
        >
          <component
            :is="item.js"
            v-bind:custom="item.package.custom"
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
  },
  computed: {
    computedRect() {
      const { scale, width, height, bgColor } = this.pageInfo
      // 以宽高的一半作为基础大小，因为越缩小，拖拽越卡顿
      return {
        width: width + 'px',
        height: height + 'px',
        background: bgColor,
        transform: `scale(${scale / 100})`,
      }
    },
    draggableRect() {
      const { scale } = this.pageInfo
      return {
        transform: `scale(${scale / 100})`,
      }
    },
  },
  data() {
    return {
      list: [],
      vLine: [],
      hLine: [],
    }
  },
  methods: {
    async dragendSingle([centerLeft, centerTop], item, e, startE) {
      const { data } = await axios.get(item.packageUrl)
      const jsData = await axios.get(item.js)
      const configData = item.config ? await axios.get(item.config) : ''
      const singlePackage = {
        package: data,
        name: data.name,
        x: e.x - centerLeft - startE.x,
        y: e.y - centerTop - startE.y,
        width: data.config.width,
        height: data.config.height,
        js: eval(jsData.data).default,
        config: configData ? eval(configData.data).default : '',
        jsApi: item.js,
        active: true,
      }
      this.list.push(singlePackage)
      this.$emit('show-right-config', 'packageInfo', singlePackage)
    },
    // 每当组件停止拖动时调用
    onDragstop([x, y], item) {
      // console.log('onDragstop', x, y, item)
      item.x = x
      item.y = y
      this.$emit('update-packageInfo', item, this.list)
      this.$emit('show-right-config', 'packageInfo', item)
    },
    // 每当组件停止调整大小时调用
    onResizstop([x, y, width, height], item) {
      // console.log('onResizstop', x, y, width, height, item)
      item.x = x
      item.y = y
      item.width = width
      item.height = height
      this.$emit('update-packageInfo', item, this.list)
      this.$emit('show-right-config', 'packageInfo', item)
    },
    // 单击组件时调用，以显示句柄。无出参；备注：句柄就是点击组件后上下左右的可以拉伸的方块点
    onActivated(item) {
      console.log('onActivated', item)
      this.$emit('show-right-config', 'packageInfo', item)
    },
    // 点击页面配置
    pageCenterClick() {
      this.$emit('show-right-config', 'pageInfo', {})
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
