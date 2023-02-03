<template>
  <div>
    <section class="pdc16">
      <h3>{{ changeForm.currentPackageInfo.package?.cn_name }}</h3>
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
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="组件配置" name="1">
        <component
          v-if="form.package?.custom"
          :is="configComponent"
          v-bind:config="form.package.custom"
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
  computed: {
    changeForm() {
      const { currentPackageInfo, showRightPanel } =
        this.$store.state.pageConfig
      return {
        currentPackageInfo,
        showRightPanel,
      }
    },
  },
  watch: {
    changeForm: {
      handler(n, o) {
        if (n?.currentPackageInfo?.key === o?.currentPackageInfo?.key) return
        const { currentPackageInfo, showRightPanel } = n
        const show =
          showRightPanel === 'packageInfo' &&
          currentPackageInfo &&
          Object.keys(currentPackageInfo).length
        if (show) {
          console.log('currentPackageInfo', currentPackageInfo)
          this.form = { ...currentPackageInfo }
          this.configComponent = eval(
            currentPackageInfo.configComponent.data
          ).default
        }
      },
      immediate: true,
      deep: true,
    },
    form: {
      handler(n) {
        this.$sotre.commit('changeCurrPackageInfo', n)
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
<style lang="scss" scoped></style>
