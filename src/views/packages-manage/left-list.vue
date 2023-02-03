<template>
  <ul class="left-ul">
    <li
      v-for="item in typeList"
      :key="item.id"
      :class="[
        'left-li',
        activeItem.id === item.id && 'el-button--primary active',
      ]"
      @click="liClick(item)"
    >
      <div>{{ item.name }}</div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'left-list',
  data() {
    return {
      activeItem: { id: '1' },
      typeList: [
        { id: '1', name: '登录组件' },
        { id: '2', name: '登录组件2' },
        { id: '3', name: '登录组件3' },
        { id: '4', name: '登录组件4' },
        { id: '5', name: '登录组件5' },
      ],
    }
  },
  created() {
    this.liClick(this.typeList[0])
  },
  methods: {
    liClick(item) {
      this.activeItem = item
      this.$emit('leftClick', item)
    },
  },
}
</script>
<style lang="scss" scoped>
.left-ul {
  width: 220px;
  height: 100%;
  .left-li {
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    cursor: pointer;
    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:hover:not(.active) {
      background-color: #e5e5e5;
    }
  }
}
</style>
