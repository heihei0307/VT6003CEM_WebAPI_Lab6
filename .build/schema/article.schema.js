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
var article_schema_exports = {};
__export(article_schema_exports, {
  article: () => article
});
module.exports = __toCommonJS(article_schema_exports);
const article = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/article",
  "title": "Article",
  "description": "An article in the blog",
  "type": "object",
  "properties": {
    "title": {
      "description": "Main title of the blog article",
      "type": "string"
    },
    "allText": {
      "description": "Body text of the blog article",
      "type": "string"
    },
    "summary": {
      "description": "Optional short text summary of article",
      "type": "string"
    },
    "imageURL": {
      "description": "URL for main image to show in article",
      "type": "uri"
    },
    "published": {
      "description": "Is the article published or not",
      "type": "boolean"
    },
    "authorID": {
      "description": "User ID of the article author",
      "type": "integer",
      "minimum": 0
    }
  },
  "required": ["title", "allText", "authorID"]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  article
});
//# sourceMappingURL=article.schema.js.map
