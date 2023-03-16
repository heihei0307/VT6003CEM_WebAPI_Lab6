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
var users_exports = {};
__export(users_exports, {
  router: () => router
});
module.exports = __toCommonJS(users_exports);
var import_koa_router = __toESM(require("koa-router"));
var import_koa_bodyparser = __toESM(require("koa-bodyparser"));
var model = __toESM(require("../models/users"));
var import_auth = require("../controllers/auth");
var import_validation = require("../controllers/validation");
const router = new import_koa_router.default({ prefix: "/api/v1/users" });
const getAll = async (ctx, next) => {
  let user = await model.getAll();
  if (user.length)
    ctx.body = user;
  else
    ctx.body = {};
  await next();
};
const getById = async (ctx, next) => {
  let id = +ctx.params.id;
  let user = await model.getById(id);
  if (user.length) {
    ctx.body = user[0];
  } else {
    ctx.status = 404;
  }
  await next();
};
const createUser = async (ctx, next) => {
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }
  await next();
};
const updateUser = async (ctx, next) => {
  let id = +ctx.params.id;
  let loginUser = ctx.state.user;
  if (id != loginUser.user.id) {
    ctx.status = 500;
    ctx.body = { err: "You can't edit other user information!" };
  } else {
    const body = ctx.request.body;
    let result = await model.update(id, body);
    if (result.status == 201) {
      ctx.status = 201;
      ctx.body = body;
    } else {
      ctx.status = 500;
      ctx.body = { err: "update data failed" };
    }
  }
  await next();
};
const deleteUser = async (ctx, next) => {
  let id = +ctx.params.id;
  let loginUser = ctx.state.user;
  if (id === loginUser.user.id) {
    ctx.status = 500;
    ctx.body = { err: "You can't remove your user, please remove other user!" };
  } else {
    let result = await model.remove(id);
    if (result.status == 201) {
      ctx.status = 201;
      ctx.body = { success: `success remove id = ${id} data` };
    } else {
      ctx.status = 500;
      ctx.body = { err: "delete data failed" };
    }
  }
  await next();
};
router.get("/", import_auth.basicAuth, getAll);
router.get("/:id([0-9]{1,})", import_auth.basicAuth, getById);
router.post("/", import_auth.basicAuth, (0, import_koa_bodyparser.default)(), import_validation.validateUser, createUser);
router.put("/:id([0-9]{1,})", import_auth.basicAuth, (0, import_koa_bodyparser.default)(), import_validation.validateUser, updateUser);
router.delete("/:id([0-9]{1,})", import_auth.basicAuth, deleteUser);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=users.js.map
