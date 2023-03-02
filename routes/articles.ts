import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/articles"
import * as DTO from '../interface/articles'

interface iArticles {
  id: number
  title: string
  fullText: string
  summary?: string
  dateCreated: Date
  dateModified?: Date
  views: number
  imageURL?: string
  published: boolean
  authorId?: number
  categoryId?: number
}

interface iArticlesArray extends Array<iArticles> { }

const dateNow = new Date()

const articles: iArticlesArray = [
  { id: 1, title: 'hello article', fullText: 'some text here to fill the body', dateCreated: dateNow, views: 100, published: true },
  { id: 2, title: 'another article', fullText: 'again here is some text here to fill', dateCreated: dateNow, views: 100, published: true },
  { id: 3, title: 'coventry university ', fullText: 'some news about coventry university', dateCreated: dateNow, views: 100, published: true },
  { id: 4, title: 'smart campus', fullText: 'smart campus is coming to IVE', dateCreated: dateNow, views: 100, published: true }
];


const router = new Router({ prefix: '/api/v1/articles' });

const getAll = async (ctx: RouterContext, next: any) => {
  let articlesSQL = await model.getAll()
  if (articlesSQL.length)
    ctx.body = articlesSQL
  else
    ctx.body = {}

  await next()
}
const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id
  let article = await model.getById(id);
  if (article.length) {
    ctx.body = article[0];
  } else {
    ctx.status = 404;
  }
  // if ((id < articles.length + 1) && (id > 0)) {
  //   ctx.body = articles[id - 1]
  // } else {
  //   ctx.status = 404
  // }

  await next()
}
const createArticle = async (ctx: RouterContext, next: any) => {
  // let { title, fullText, summary, views, imageURL, published, authorId, categoryId } = <iArticles>ctx.request.body;
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }

  // const lastestId = articles.at(-1)?.id ?? 0
  // let newArticle = { id: lastestId + 1, title: title, fullText: fullText, summary: summary, dateCreated: new Date(), views: views ?? 1, imageURL: imageURL, published: published ?? true, authorId: authorId, categoryId: categoryId }
  // articles.push(newArticle)
  // ctx.status = 201
  // ctx.body = newArticle

  await next()
}
const updateArticle = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id
  // if (!((id < articles.length + 1) && (id > 0))) {
  //   ctx.status = 404
  // }

  // let { title, fullText, summary, views, imageURL, published, authorId, categoryId } = <iArticles>ctx.request.body;

  // articles[id - 1].title = title ?? articles[id - 1].title
  // articles[id - 1].fullText = fullText ?? articles[id - 1].fullText
  // articles[id - 1].summary = summary ?? articles[id - 1].summary
  // articles[id - 1].dateModified = new Date()
  // articles[id - 1].views = views ?? articles[id - 1].views
  // articles[id - 1].imageURL = imageURL ?? articles[id - 1].imageURL
  // articles[id - 1].published = published ?? articles[id - 1].published
  // articles[id - 1].authorId = authorId ?? articles[id - 1].authorId
  // articles[id - 1].categoryId = categoryId ?? articles[id - 1].categoryId

  const body = <DTO.iArticles>ctx.request.body;
  let result = await model.update(id, body)
  // ctx.body = articles[id - 1]
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }
  await next()
}
const deleteArticle = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id
  // if (!((id < articles.length + 1) && (id > 0))) {
  //   ctx.status = 404
  // }
  // const objWithIdIndex = articles.findIndex((obj) => obj.id === id)
  // articles.splice(objWithIdIndex, 1)
  // ctx.status = 200
  let result = await model.remove(id)
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = { success: `success remove id = ${id} data` }
  } else {
    ctx.status = 500;
    ctx.body = { err: "delete data failed" };
  }

  await next()
}

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.post('/', bodyParser(), createArticle);
router.put('/:id([0-9]{1,})', bodyParser(), updateArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);

export { router }