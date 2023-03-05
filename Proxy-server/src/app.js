const static = require('koa-static')
const path = require('path')
const { APP_PORT } = require('./config/default')

//路径写成./app时，文件夹app与app.js重名会把app当作app.js导入导致出错
const app = require('./app/index')
app.listen(APP_PORT, () => {
  console.log(`服务运行在 http://localhost:${APP_PORT}`)
})
