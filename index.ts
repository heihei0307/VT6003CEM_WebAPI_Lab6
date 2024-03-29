import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

import { router as articles } from "./routes/articles";
import { router as users } from "./routes/users";
import { router as special } from "./routes/special";
import serve from 'koa-static-folder';


const app: Koa = new Koa();
// const router: Router = new Router();
// const welcomeAPI = async (ctx: RouterContext, next: any) => {
//   ctx.body = {
//     message: "Welcome to the blog API!"
//   };
//   await next();
// }
// router.get('/api/v1', welcomeAPI);


app.use(serve('./docs'))

app.use(logger());
app.use(json());
// app.use(router.routes());
app.use(articles.routes()).use(articles.allowedMethods())
app.use(users.routes()).use(users.allowedMethods())
app.use(special.routes()).use(special.allowedMethods())

app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = { err: "No such endpoint existed" }
    }
  } catch (err: any) {
    ctx.body = { err: err }
  }
})


app.listen(10888);