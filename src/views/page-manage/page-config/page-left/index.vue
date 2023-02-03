<template>
  <div class="page-left">
    <div class="top">
      <span>列表</span>
    </div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="登录组件" name="1">
        <ul ref="UlBox">
          <li v-for="item in packageList" :key="item.id" class="li-box pdc8">
            <img
              :src="item.img"
              class="li-img"
              draggable="true"
              @dragstart="dragstart"
              @dragend="(e) => dragend(item, e)"
            />
            <div>{{ item.name }}</div>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: 'page-left',
  data() {
    return {
      activeName: '1',
      packageList: [],
      dragstartEle: null,
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    dragstart(e) {
      const ulLeft = this.$refs.UlBox.offsetLeft
      const ulTop = this.$refs.UlBox.offsetTop
      this.dragstartEle = {
        ...e,
        x: e.x - ulLeft,
        y: e.y - ulTop,
      }
    },
    dragend(item, e) {
      console.log('eeeee', e)
      this.$emit('dragend', item, e, this.dragstartEle)
    },
    getDetail() {
      this.packageList = [
        {
          id: '1',
          js: 'https://192.168.2.18/static/oss/hsja-platform-image/login/login-img/index.js',
          img: 'https://192.168.2.18/static/oss/hsja-platform-image/login/login-img/preview.png',
          packageUrl:
            'https://192.168.2.18/static/oss/hsja-platform-image/login/login-img/package.json',
          name: '测试',
        },
        {
          id: '2',
          js: 'https://192.168.2.18/static/oss/hsja-platform-image/login/login-title/index.js',
          img: 'https://192.168.2.18/static/oss/hsja-platform-image/login/login-title/preview.png',
          packageUrl:
            'https://192.168.2.18/static/oss/hsja-platform-image/login/login-title/package.json',
          name: '测试config',
          config:
            'https://192.168.2.18/static/oss/hsja-platform-image/login/login-title/config.js',
        },
        {
          id: '3',
          js: 'https://192.168.2.18/static/oss/hsja-platform-image/login/login-list/index.js',
          img: 'https://192.168.2.18/static/oss/hsja-platform-image/login/login-list/preview.png',
          packageUrl:
            'https://192.168.2.18/static/oss/hsja-platform-image/login/login-list/package.json',
          name: '测试config',
          config:
            'https://192.168.2.18/static/oss/hsja-platform-image/login/login-list/config.js',
        },
      ]
    },
  },
}
</script>
<style lang="scss" scoped>
.page-left {
  background-color: #f2f3f5;
  width: 200px;
  flex-shrink: 0;
  height: 100%;
  border-right: 1px solid #f2f3f5;
}
.li-box {
  width: 100%;
  box-sizing: border-box;
  .li-img {
    width: 100%;
  }
}
</style>
