export default {
  state: {
    currentPackageInfo: {}, // 当前选中组件信息
    configList: [], // 拖拽至页面中的组件list
    showRightPanel: 'pageInfo', //pageInfo显示页面配置 ||  packageInfo显示组件配置
    pageInfo: {
      pageName: '主题',
      scale: 50,
    },
  },
  mutations: {
    changeCurrPackageInfo(state, data) {
      state.currentPackageInfo = data
    },
    changeConfigList(state, list) {
      state.configList = list
    },
    changeRightPanel(state, str) {
      state.showRightPanel = str
    },
    changePageInfo(state, info) {
      state.pageInfo = {
        ...state.pageInfo,
        ...info,
      }
    },
  },
  actions: {
    getPageInfo({ commit }) {
      // 调接口
      const data = {
        pageName: '主题名称',
        scale: 50,
      }
      commit('changePageInfo', data)
    },
  },
}
