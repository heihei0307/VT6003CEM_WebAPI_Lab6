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
var database_exports = {};
__export(database_exports, {
  run_delete: () => run_delete,
  run_insert: () => run_insert,
  run_query: () => run_query,
  run_update: () => run_update
});
module.exports = __toCommonJS(database_exports);
var import_sequelize = require("sequelize");
var import_config = require("../config");
const run_query = async (query, values) => {
  try {
    const sequelize = new import_sequelize.Sequelize(`postgres://${import_config.config.user}:${import_config.config.password}@${import_config.config.host}:${import_config.config.port}/${import_config.config.database}`);
    await sequelize.authenticate();
    let data = await sequelize.query(query, {
      replacements: values,
      type: import_sequelize.QueryTypes.SELECT
    });
    await sequelize.close();
    return data;
  } catch (err) {
    console.error(err, query, values);
    throw "Database query error";
  }
};
const run_insert = async function run_insert2(sql, values) {
  try {
    const sequelize = new import_sequelize.Sequelize(`postgres://${import_config.config.user}:${import_config.config.password}@${import_config.config.host}:${import_config.config.port}/${import_config.config.database}`);
    await sequelize.authenticate();
    let data = await sequelize.query(sql, {
      replacements: values,
      type: import_sequelize.QueryTypes.INSERT
    });
    await sequelize.close();
    return data;
  } catch (err) {
    console.error(err, sql, values);
    throw "Database query error";
  }
};
const run_update = async function run_update2(sql) {
  try {
    const sequelize = new import_sequelize.Sequelize(`postgres://${import_config.config.user}:${import_config.config.password}@${import_config.config.host}:${import_config.config.port}/${import_config.config.database}`);
    await sequelize.authenticate();
    let data = await sequelize.query(sql, {
      type: import_sequelize.QueryTypes.UPDATE
    });
    await sequelize.close();
    return data;
  } catch (err) {
    console.error(err, sql);
    throw "Database query error";
  }
};
const run_delete = async function run_delete2(sql) {
  try {
    const sequelize = new import_sequelize.Sequelize(`postgres://${import_config.config.user}:${import_config.config.password}@${import_config.config.host}:${import_config.config.port}/${import_config.config.database}`);
    await sequelize.authenticate();
    let data = await sequelize.query(sql, {
      type: import_sequelize.QueryTypes.DELETE
    });
    await sequelize.close();
    return data;
  } catch (err) {
    console.error(err, sql);
    throw "Database query error";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  run_delete,
  run_insert,
  run_query,
  run_update
});
//# sourceMappingURL=database.js.map
