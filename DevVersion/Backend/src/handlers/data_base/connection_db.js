import mysql from "mysql2/promise";


let connectionDB;
try {
    connectionDB = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "task-db",
  });
} catch (e) {
  console.log(e)
}

export default connectionDB