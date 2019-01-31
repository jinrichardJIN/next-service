const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 8000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()
	// 首页
    router.get('/', async ctx => {
      await app.render(ctx.req, ctx.res, '/', ctx.query)
      ctx.respond = false
    })
	// 关于
    router.get('/about', async ctx => {
      await app.render(ctx.req, ctx.res, '/about', ctx.query)
      ctx.respond = false
    })
	// 产品
    router.get('/products/:id', async ctx => {
      const {id} = ctx.params
      await app.render(ctx.req, ctx.res, `/products/${id}`, ctx.query)
      ctx.respond = false
    })
	// 案例
    router.get('/case', async ctx => {
      await app.render(ctx.req, ctx.res, '/case', ctx.query)
      ctx.respond = false
    })
	// 联系我们
    router.get('/contact', async ctx => {
      await app.render(ctx.req, ctx.res, '/contact', ctx.query)
      ctx.respond = false
    })
	// 详情
    router.get('/view/:type/:id', async ctx => {
      const {id, type} = ctx.params
      await app.render(ctx.req, ctx.res, `/view`, {id, type})
      ctx.respond = false
    })
    // 如果没有配置nginx做静态文件服务，下面代码请务必开启
   /* router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })*/
    // 防止出现控制台报404错误
    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })
    server.use(router.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })

