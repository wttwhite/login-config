<template>
  <div>
    <span class="input-pre">{{ preStr }}</span>
    <el-input-number
      :min="1"
      style="width: 98px"
      v-model="inputValue"
      controls-position="right"
    ></el-input-number>
  </div>
</template>
<script>
export default {
  name: 'input-number-pre',
  props: {
    preStr: {
      type: String,
      default: 'H',
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    value: {
      handler(n) {
        this.inputValue = n
      },
      immediate: true,
    },
    inputValue(n) {
      this.$emit('input', n)
    },
  },
  data() {
    return {
      inputValue: 0,
    }
  },
}
</script>
<style lang="scss" scoped>
.input-pre {
  box-sizing: border-box;
  width: 28px;
  background: rgb(233, 233, 233);
  border-radius: 2px 0 0 2px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.4);
  display: inline-block;
  text-align: center;
  border: 1px solid #c0c4cc;
  position: relative;
  top: 0;
  z-index: 1;
  right: -4px;
}
</style>
