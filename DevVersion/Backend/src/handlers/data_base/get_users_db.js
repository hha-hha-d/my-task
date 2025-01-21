import connectionDB  from "./connection_db.js";

export async function authDB({ login, password }) {
  if (login && password) {
    try {
      const [results] = await connectionDB.query(
        "SELECT * FROM `users` WHERE `login` = ? AND `password` = ?",
        [login, password],
      );

      return results;
    } catch (err) {
      console.log(err);
    }
  }
}
