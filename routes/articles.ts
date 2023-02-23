import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";

interface iArticles {
  id: number
  title: string
  fullText: string
}

interface iArticlesArray extends Array<iArticles> { }

const articles: iArticlesArray = [
  { id: 1, title: 'hello article', fullText: 'some text here to fill the body' },
  { id: 2, title: 'another article', fullText: 'again here is some text here to fill' },
  { id: 3, title: 'coventry university ', fullText: 'some news about coventry university' },
  { id: 4, title: 'smart campus', fullText: 'smart campus is coming to IVE' }
];


const router = new Router({ prefix: '/api/v1/articles' });

const getAll = async (ctx: RouterContext, next: any) => {
  ctx.body = articles

  await next()
}
const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id
  console.log(id)
  console.log(articles.length + 1)
  if ((id < articles.length + 1) && (id > 0)) {
    ctx.body = articles[id - 1]
  } else {
    ctx.status = 404
  }

  await next()
}
const createArticle = async (ctx: RouterContext, next: any) => {
  let { title, fullText } = <iArticles>ctx.request.body;
  const lastestId = articles.at(-1)?.id ?? 0
  let newArticle = { id: lastestId + 1, title: title, fullText: fullText }
  articles.push(newArticle)
  ctx.status = 201
  ctx.body = newArticle

  await next()
}
const updateArticle = async (ctx: RouterContext, next: any) => {
  await next()
}
const deleteArticle = async (ctx: RouterContext, next: any) => {
  await next()
}

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.post('/', bodyParser(), createArticle);
router.put('/:id([0-9]{1,})', updateArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);

export { router }