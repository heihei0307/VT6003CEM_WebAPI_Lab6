import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";

interface iArticles {
  title: string
  fullText: string
}

interface iArticlesArray extends Array<iArticles> { }

const articles: iArticlesArray = [
  { title: 'hello article', fullText: 'some text here to fill the body' },
  { title: 'another article', fullText: 'again here is some text here to fill' },
  { title: 'coventry university ', fullText: 'some news about coventry university' },
  { title: 'smart campus', fullText: 'smart campus is coming to IVE' }
];


const router = new Router({ prefix: '/api/v1/articles' });

const getAll = async (ctx: RouterContext, next: any) => {
  ctx.body = articles

  await next()
}
const getById = async (ctx: RouterContext, next: any) => {
  await next()
}
const createArticle = async (ctx: RouterContext, next: any) => {
  await next()
}
const updateArticle = async (ctx: RouterContext, next: any) => {
  await next()
}
const deleteArticle = async (ctx: RouterContext, next: any) => {
  await next()
}

router.get('/', getAll);
router.get('/', getById);
router.post('/:id', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export { router }