import arkfun from 'arkfun'
const { _axios } = arkfun
const request = _axios({
  context: 'hsjareplace', //上下文
  env: 'app', //服务环境, 目前 app,wx
  authentication: true, //是否进行鉴权
  token: process.env.NODE_ENV == 'production' ? null : '', //开发环境调试的token
  callback: null, //response自定义回调  入参为response
  headerOption: {}, //请求头自定义配置
  createOption: {}, //请求实例创建自定义配置
  configOptionFun: null, //请求配置自定义配置
})
//此处是demo
export function getDataInfo(data) {
  return request({
    url: '',
    method: '',
    data,
  })
}
