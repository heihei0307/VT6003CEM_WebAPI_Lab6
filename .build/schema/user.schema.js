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
var user_schema_exports = {};
__export(user_schema_exports, {
  user: () => user
});
module.exports = __toCommonJS(user_schema_exports);
const user = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/user",
  "title": "User",
  "description": "An user in the blog",
  "type": "object",
  "properties": {
    "firstname": {
      "description": "User firstname",
      "type": "string"
    },
    "lastname": {
      "description": "User lastname",
      "type": "string"
    },
    "username": {
      "description": "User username",
      "type": "string"
    },
    "about": {
      "description": "About user",
      "type": "string"
    },
    "dateregistered": {
      "description": "Date of user registered",
      "type": "date"
    },
    "password": {
      "description": "User password",
      "type": "string"
    },
    "passwordsalt": {
      "description": "User password salt",
      "type": "string"
    },
    "email": {
      "description": "User email",
      "type": "string"
    },
    "avatarurl": {
      "description": "User avatar url",
      "type": "string"
    }
  },
  "required": ["username", "dateregistered", "email"]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  user
});
//# sourceMappingURL=user.schema.js.map
