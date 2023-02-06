<template>
  <div>
    <section class="pdc16">
      <h3>{{ $attrs.packageInfo.package?.cn_name }}</h3>
      <div class="pdh8">组件尺寸</div>
      <section class="flex-between">
        <input-number-pre v-model="form.width" preStr="W" />
        <input-number-pre v-model="form.height" />
      </section>
      <div class="pdh8">组件位置</div>
      <section class="flex-between">
        <input-number-pre v-model="form.x" preStr="X" />
        <input-number-pre v-model="form.y" preStr="Y" />
      </section>
    </section>
    <el-collapse v-model="activeName" accordion class="collapse-box">
      <el-collapse-item title="组件配置" name="1">
        <component
          v-if="configComponent"
          :is="configComponent"
          v-bind:config="form.package.config"
        ></component>
        <div v-else>暂无配置</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import inputNumberPre from '@/components/input-number-pre'

export default {
  name: 'package-info',
  components: { inputNumberPre },
  computed: {},
  watch: {
    form: {
      handler(n) {
        this.$emit('update-currPackageInfo', n)
      },
      immediate: true,
      deep: true,
    },
    '$attrs.packageInfo': {
      handler(n, o) {
        if (!n) return
        this.form = n
        if (n.key !== o?.key) {
          this.configComponent = n?.configComponent?.data
            ? eval(n.configComponent.data).default
            : ''
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      activeName: '1',
      configComponent: '',
      form: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.collapse-box {
  margin-top: 12px;
}
</style>
