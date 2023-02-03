<template>
  <div :class="['full-h ovh', isDev && 'has-dev-menu']">
    <div v-if="isDev" class="dev-menu-box">
      <div class="collapse-btn" @click="isCollapse = !isCollapse">
        <i :class="`el-icon-s-${isCollapse ? 'unfold' : 'fold'}`"></i>
      </div>
      <el-scrollbar wrap-class="menu-scrollbar__wrap" :size="6">
        <el-menu
          class="menu-wrap"
          theme="light"
          :collapse="isCollapse"
          :default-active="defaultMenu"
          collapse-btn
          @click-collapse="isCollapse = !isCollapse"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(item, index) in menuList"
            :key="index"
            :index="item.path"
            icon="h-icon-menu_f"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>

    <router-view />
  </div>
</template>
<script>
import routes from '@/router'
export default {
  name: 'App',
  data() {
    return {
      isCollapse: false,
      isDev: process.env.NODE_ENV === 'development',
      defaultMenu: '',
      menuList: routes.filter((item) => item.menu),
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.defaultMenu = val.path
        if (val.path.indexOf('/page-manage/config/container') > -1) {
          this.isDev = false
        }
      },
    },
  },
  methods: {
    handleSelect(path) {
      this.$router.replace({
        path,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
// 本地联调菜单样式
.has-dev-menu {
  display: flex;
  height: 100%;
  .dev-menu-box {
    flex-shrink: 0;
    .collapse-btn {
      color: #797a7e;
      border-right: solid 1px #e6e6e6;
      font-size: 24px;
      cursor: pointer;
      padding: 12px 0 0 20px;
    }
    .el-scrollbar {
      height: calc(100% - 50px);
    }
    &::v-deep {
      .menu-scrollbar__wrap {
        height: 100%;
        overflow-x: hidden;
        .menu-wrap {
          height: 100%;
          &:not(.el-menu--collapse) {
            width: 200px;
          }
        }
      }
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
  > :nth-child(2) {
    width: calc(100% - 200px);
    flex: auto;
  }
}
</style>
