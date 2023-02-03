import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from '@/store'
import 'normalize.css'
import '../public-path.js'
import '@/style/index.scss'
import ElementUI from 'element-ui'
import arkfun from 'arkfun'
const { handleRoute } = arkfun

import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(ElementUI, {
  size: 'small',
})
Vue.config.productionTip = false

let instance = null
let router = null
let newRoute = []
function render(props) {
  const { container, pubPath, setExampke, pageId } = props
  Vue.prototype.$publicPath = pubPath ? pubPath : ''
  Vue.prototype.$arkPageId = pageId ? pageId : ''
  Vue.use(VueRouter)
  if (props.pubPath) {
    newRoute = handleRoute(routes, props)
  } else {
    newRoute = routes
  }
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? `/${props.pubPath}` : '/',
    mode: 'hash',
    routes: newRoute,
  })
  if (window.__POWERED_BY_QIANKUN__) {
    router.beforeEach((to, from, next) => {
      if (!to.path.includes(pubPath)) {
        next({
          ...to,
          path: pubPath + to.path,
          fullPath: pubPath + to.fullPath,
        })
      } else {
        next()
      }
    })
  }
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
  setExampke &&
    setExampke({
      callback: function () {
        instance.$destroy()
        instance.$el.innerHTML = ''
        instance = null
        router = null
        newRoute = []
      },
    })
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({ container: null })
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  const { container, pageMsg } = props
  if (pageMsg) {
    window.hsja_activePageData = pageMsg
  }
  if (instance === null) {
    render(props)
  } else {
    let dom = container
      ? container.querySelector('#app')
      : document.getElementById('app')
    dom.innerHTML = ''
    dom.appendChild(instance.$el)
  }
}

export async function unmount() {}
