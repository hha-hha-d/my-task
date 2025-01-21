import  connectionDB  from "./connection_db.js";

export async function getPersonDB([...values]) {
  console.log(values);
  if (values.length !== 0) {
    const arrayOfPromises = [];
    values.map((elem) => {
      arrayOfPromises.push(
        connectionDB.query(
          "SELECT * FROM `personal_data` where concat(surname,name,patronomyc, identif) like CONCAT('%', ?, '%')",
          [elem]
        )
      );
    });
    try {
      const ress = await Promise.all(arrayOfPromises);
      const filteredUsers = [];
      ress.map((elem) => filteredUsers.push(elem[0][0]));
      return filteredUsers;
    } catch (err) {
      console.log(err);
    }
  }
}
