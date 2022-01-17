import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage";

enablePromise(true);

const usersTable = "usersTable";
const cartTable = "cartTable";
const ordersTable = "ordersTable";

export const getDBConnection = async () => {
  return openDatabase({ name: "book-store.db", location: "default" });
};


export const createTable = async (db) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};
