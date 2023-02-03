<template>
  <div class="page-top pdc16">
    <div>{{ pageInfo.pageName }}</div>
    <section>
      <el-input-number
        v-model="scale"
        :min="1"
        :max="100"
        :step="10"
      ></el-input-number>
      <el-button @click="previewClick">预览</el-button>
      <el-button @click="saveClick">保存</el-button>
    </section>
  </div>
</template>
<script>
export default {
  name: 'page-top',
  props: {
    pageInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  watch: {
    pageInfo: {
      handler(n) {
        this.scale = n.scale
      },
      deep: true,
    },
    scale(n) {
      this.$emit('update-pageInfo', { scale: n })
    },
  },
  data() {
    return {
      scale: 50,
    }
  },
  methods: {
    previewClick() {
      this.$emit('preview-click')
    },
    saveClick() {
      this.$emit('save-click')
    },
  },
}
</script>
<style lang="scss" scoped>
.page-top {
  height: 64px;
  width: 100%;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}
</style>
