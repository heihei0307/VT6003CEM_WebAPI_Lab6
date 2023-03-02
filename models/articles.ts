import * as db from '../helpers/database'
import * as DTO from '../interface/articles'

//get a single article by its id
export const getById = async (id: any) => {
  let query = "SELECT * FROM articles WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

//list all the articles in the database
export const getAll = async () => {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM articles;"
  let data = await db.run_query(query, null);
  return data;
}

//create a new article in the database
export const add = async (article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(',');
  let param = '';
  for (let i: number = 0; i < values.length; i++) { param += '?,' }
  param = param.slice(0, -1);
  let query = `INSERT INTO articles (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

export const update = async (id: number, article: DTO.iArticles) => {
  let updateItem = ''
  Object.entries(article).forEach(entry => {
    const [key, value] = entry;
    if (updateItem != '')
      updateItem += ', '

    updateItem += `${key} = '${value}'`
    console.log(key, value);
  })
  let query = `UPDATE articles SET ${updateItem} where id = ${id}`
  try {
    await db.run_update(query);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

export const remove = async (id: number) => {
  let query = `DELETE FROM articles WHERE id = ${id};`
  try {
    await db.run_delete(query);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}