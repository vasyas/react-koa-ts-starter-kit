require("source-map-support").install()

import * as Koa from "koa"
import * as koaBody from "koa-body"
import * as Router from "koa-router"

const app = new Koa()

// body parser
app.use(koaBody({ multipart: true }))

// exception handling
app.use(async (ctx, next) => {
    try {
        return await next()
    } catch (e) {
        const msg = e instanceof Error ? e.message : "" + e

        ctx.status = 500
        ctx.body = msg

        console.error(`While ${ctx.request.path}:`, e)
    }
})

export async function start() {
    try {
        const api = new Router({ prefix: "/api" })

        api.get("/hello", (ctx) => {
            ctx.body = { hello: "yes" }
        })

        app.use(api.routes())
            .use(api.allowedMethods())

        app.listen(8080)

        console.log(`Server started at port 8080`)
    } catch (e) {
        console.error("Failed to start", e)
        process.exit(1)
    }
}

if (require.main === module)
    start()