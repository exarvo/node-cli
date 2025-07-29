import { readFile, writeFile } from "fs/promises";

const DB_PATH = new URL("../dbStore.json", import.meta.url).pathname;

export const getDB = async () => {
  const db = await readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const setDB = async (db) => {
  await writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};
