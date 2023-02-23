"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var articles_exports = {};
__export(articles_exports, {
  router: () => router
});
module.exports = __toCommonJS(articles_exports);
var import_koa_router = __toESM(require("koa-router"));
var import_koa_bodyparser = __toESM(require("koa-bodyparser"));
const dateNow = new Date();
const articles = [
  { id: 1, title: "hello article", fullText: "some text here to fill the body", dateCreated: dateNow, views: 100, published: true },
  { id: 2, title: "another article", fullText: "again here is some text here to fill", dateCreated: dateNow, views: 100, published: true },
  { id: 3, title: "coventry university ", fullText: "some news about coventry university", dateCreated: dateNow, views: 100, published: true },
  { id: 4, title: "smart campus", fullText: "smart campus is coming to IVE", dateCreated: dateNow, views: 100, published: true }
];
const router = new import_koa_router.default({ prefix: "/api/v1/articles" });
const getAll = async (ctx, next) => {
  ctx.body = articles;
  await next();
};
const getById = async (ctx, next) => {
  let id = +ctx.params.id;
  if (id < articles.length + 1 && id > 0) {
    ctx.body = articles[id - 1];
  } else {
    ctx.status = 404;
  }
  await next();
};
const createArticle = async (ctx, next) => {
  var _a;
  let { title, fullText, summary, views, imageURL, published, authorId, categoryId } = ctx.request.body;
  const lastestId = ((_a = articles.at(-1)) == null ? void 0 : _a.id) ?? 0;
  let newArticle = { id: lastestId + 1, title, fullText, summary, dateCreated: new Date(), views: views ?? 1, imageURL, published: published ?? true, authorId, categoryId };
  articles.push(newArticle);
  ctx.status = 201;
  ctx.body = newArticle;
  await next();
};
const updateArticle = async (ctx, next) => {
  let id = +ctx.params.id;
  if (!(id < articles.length + 1 && id > 0)) {
    ctx.status = 404;
  }
  let { title, fullText, summary, views, imageURL, published, authorId, categoryId } = ctx.request.body;
  articles[id - 1].title = title ?? articles[id - 1].title;
  articles[id - 1].fullText = fullText ?? articles[id - 1].fullText;
  articles[id - 1].summary = summary ?? articles[id - 1].summary;
  articles[id - 1].dateModified = new Date();
  articles[id - 1].views = views ?? articles[id - 1].views;
  articles[id - 1].imageURL = imageURL ?? articles[id - 1].imageURL;
  articles[id - 1].published = published ?? articles[id - 1].published;
  articles[id - 1].authorId = authorId ?? articles[id - 1].authorId;
  articles[id - 1].categoryId = categoryId ?? articles[id - 1].categoryId;
  ctx.body = articles[id - 1];
  await next();
};
const deleteArticle = async (ctx, next) => {
  let id = +ctx.params.id;
  if (!(id < articles.length + 1 && id > 0)) {
    ctx.status = 404;
  }
  const objWithIdIndex = articles.findIndex((obj) => obj.id === id);
  articles.splice(objWithIdIndex, 1);
  ctx.status = 200;
  await next();
};
router.get("/", getAll);
router.get("/:id([0-9]{1,})", getById);
router.post("/", (0, import_koa_bodyparser.default)(), createArticle);
router.put("/:id([0-9]{1,})", (0, import_koa_bodyparser.default)(), updateArticle);
router.delete("/:id([0-9]{1,})", deleteArticle);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=articles.js.map
