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
var auth_exports = {};
__export(auth_exports, {
  basicAuth: () => basicAuth
});
module.exports = __toCommonJS(auth_exports);
var import_koa_passport = __toESM(require("koa-passport"));
var import_passport_http = require("passport-http");
var users = __toESM(require("../models/users"));
const verifyPassword = (user, password) => {
  return user.password === password;
};
import_koa_passport.default.use(new import_passport_http.BasicStrategy(async (username, password, done) => {
  let result = [];
  try {
    result = await users.findByUsername(username);
  } catch (error) {
    console.log(`Error during authentication for user ${username}:
${error}`);
    done(null, false);
  }
  if (result.length) {
    const user = result[0];
    if (verifyPassword(user, password)) {
      done(null, { user });
    } else {
      console.log(`Password incorrect for ${username}`);
      done(null, false);
    }
  } else {
    console.log(`No user found with username ${username}`);
    done(null, false);
  }
}));
const basicAuth = async (ctx, next) => {
  await import_koa_passport.default.authenticate("basic", { session: false })(ctx, next);
  if (ctx.status == 401) {
    ctx.body = {
      message: "you are not authorized"
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  basicAuth
});
//# sourceMappingURL=auth.js.map
