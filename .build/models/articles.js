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
  add: () => add,
  getAll: () => getAll,
  getById: () => getById,
  remove: () => remove,
  update: () => update
});
module.exports = __toCommonJS(articles_exports);
var db = __toESM(require("../helpers/database"));
const getById = async (id) => {
  let query = "SELECT * FROM articles WHERE ID = ?";
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
};
const getAll = async () => {
  let query = "SELECT * FROM articles;";
  let data = await db.run_query(query, null);
  return data;
};
const add = async (article) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(",");
  let param = "";
  for (let i = 0; i < values.length; i++) {
    param += "?,";
  }
  param = param.slice(0, -1);
  let query = `INSERT INTO articles (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err) {
    return err;
  }
};
const update = async (id, article, userId) => {
  let articlesData = await getById(id);
  if (articlesData.length) {
    let articles = articlesData[0];
    if (articles.authorid != userId) {
      return { status: 500, err: "You are not articles owner" };
    }
  }
  let updateItem = "";
  Object.entries(article).forEach((entry) => {
    const [key, value] = entry;
    if (updateItem != "")
      updateItem += ", ";
    updateItem += `${key} = '${value}'`;
    console.log(key, value);
  });
  let query = `UPDATE articles SET ${updateItem} where id = ${id}`;
  try {
    await db.run_update(query);
    return { status: 201 };
  } catch (err) {
    return err;
  }
};
const remove = async (id, userId) => {
  if (!await checkArticlesOwner(id, userId)) {
    return { status: 500, err: "You are not articles owner" };
  }
  let query = `DELETE FROM articles WHERE id = ${id};`;
  try {
    await db.run_delete(query);
    return { status: 201 };
  } catch (err) {
    return err;
  }
};
const checkArticlesOwner = async (articlesId, loginUserId) => {
  let articlesData = await getById(articlesId);
  if (articlesData.length) {
    let articles = articlesData[0];
    if (articles.authorid != loginUserId)
      return false;
    else
      return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  getAll,
  getById,
  remove,
  update
});
//# sourceMappingURL=articles.js.map
