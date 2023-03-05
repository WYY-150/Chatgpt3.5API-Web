const Router = require('koa-router')

const {
  getres,
} = require('../../controller/resourcesController')

const resources = new Router({ prefix: '/resources' })
resources.post('/proxys', getres)

module.exports = resources
