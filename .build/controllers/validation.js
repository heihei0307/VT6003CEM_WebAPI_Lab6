"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var validation_exports = {};
__export(validation_exports, {
  validateArticle: () => validateArticle,
  validateUser: () => validateUser
});
module.exports = __toCommonJS(validation_exports);
var import_jsonschema = require("jsonschema");
var import_article = require("../schema/article.schema");
var import_user = require("../schema/user.schema");
const v = new import_jsonschema.Validator();
const validateArticle = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  };
  const body = ctx.request.body;
  try {
    v.validate(body, import_article.article, validationOptions);
    await next();
  } catch (error) {
    if (error instanceof import_jsonschema.ValidationError) {
      ctx.body = error;
      ctx.status = 400;
    } else {
      throw error;
    }
  }
};
const validateUser = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  };
  const body = ctx.request.body;
  try {
    v.validate(body, import_user.user, validationOptions);
    await next();
  } catch (error) {
    if (error instanceof import_jsonschema.ValidationError) {
      ctx.body = error;
      ctx.status = 400;
    } else {
      throw error;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validateArticle,
  validateUser
});
//# sourceMappingURL=validation.js.map
