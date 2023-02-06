export default {
  state: {},
  mutations: {
    // changeCurrPackageInfo(state, data) {
    //   state.currentPackageInfo = data
    // },
    // changeConfigList(state, list) {
    //   state.configList = list
    // },
    // changeRightPanel(state, str) {
    //   state.showRightPanel = str
    // },
    // changePageInfo(state, info) {
    //   state.pageInfo = {
    //     ...state.pageInfo,
    //     ...info,
    //   }
    // },
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
