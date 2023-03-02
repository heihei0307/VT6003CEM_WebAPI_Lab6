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
  add: () => add,
  getAll: () => getAll,
  getById: () => getById,
  remove: () => remove,
  update: () => update
});
module.exports = __toCommonJS(users_exports);
var db = __toESM(require("../helpers/database"));
const getById = async (id) => {
  let query = "SELECT * FROM users WHERE ID = ?";
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
};
const getAll = async () => {
  let query = "SELECT * FROM users;";
  let data = await db.run_query(query, null);
  return data;
};
const add = async (users) => {
  let keys = Object.keys(users);
  let values = Object.values(users);
  let key = keys.join(",");
  let param = "";
  for (let i = 0; i < values.length; i++) {
    param += "?,";
  }
  param = param.slice(0, -1);
  let query = `INSERT INTO users (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err) {
    return err;
  }
};
const update = async (id, user) => {
  let updateItem = "";
  Object.entries(user).forEach((entry) => {
    const [key, value] = entry;
    if (updateItem != "")
      updateItem += ", ";
    updateItem += `${key} = '${value}'`;
    console.log(key, value);
  });
  let query = `UPDATE users SET ${updateItem} where id = ${id}`;
  try {
    await db.run_update(query);
    return { status: 201 };
  } catch (err) {
    return err;
  }
};
const remove = async (id) => {
  let query = `DELETE FROM users WHERE id = ${id};`;
  try {
    await db.run_delete(query);
    return { status: 201 };
  } catch (err) {
    return err;
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
//# sourceMappingURL=users.js.map
