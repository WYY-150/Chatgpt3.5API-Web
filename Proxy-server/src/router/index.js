const Router = require('koa-router')

const resources = require('./routes/resourcesRouter')

//创建router路由实例对象
const router = new Router()
router.use(resources.routes(), resources.allowedMethods())
module.exports = router
