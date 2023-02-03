<template>
  <div class="">
    页面信息
    <div class="pdc16">
      <section>
        <div class="pdh8">主题名称</div>
        <el-input
          v-model="form.pageName"
          placeholder="请输入内容"
          clearable
        ></el-input>
        <el-divider />
      </section>
      <section>
        <div class="pdh8">画布尺寸</div>
        <section class="flex-between">
          <input-number-pre v-model="form.width" preStr="W" />
          <input-number-pre v-model="form.height" />
        </section>
        <el-divider />
      </section>
      <section>
        <div class="pdh8">背景</div>
        <el-color-picker v-model="form.bgColor" show-alpha></el-color-picker>
      </section>
    </div>
  </div>
</template>
<script>
import inputNumberPre from '@/components/input-number-pre'
export default {
  name: 'page-info',
  components: { inputNumberPre },
  watch: {
    form: {
      handler(n) {
        this.$store.commit('changePageInfo', n)
      },
      deep: true,
    },
  },
  data() {
    return {
      form: {
        pageName: '',
        width: 1920,
        height: 1080,
        bgColor: '',
      },
    }
  },
  mounted() {
    console.log('this.$attrsthis.$attrsthis.$attrs', this.$attrs)
    this.form.pageName = this.$attrs.pageInfo.pageName
  },
  methods: {},
}
</script>
<style lang="scss" scoped></style>
