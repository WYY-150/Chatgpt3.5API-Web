const path = require('path')

const Koa = require('koa')
const koaBody = require('koa-body') //获取请求体数据
const parameter = require('koa-parameter') //格式校验

const router = require('../router')
const errorHandler = require('./errorHandler') //统一错误处理

// 创建app实例
const app = new Koa()

app.use(
  koaBody({


  })
)

app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods())

//统一错误处理
app.on('error', errorHandler)

module.exports = app
