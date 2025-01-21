import express from "express";
const routerAuth = express.Router();

import { authDB } from "../handlers/data_base/get_users_db.js";
import jwt from "jsonwebtoken";

routerAuth.post("/auth", async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const resultsDB = await authDB({ login, password });

  if (resultsDB.length !== 0) {
    const token = jwt.sign(
      {
        data: {
          name: resultsDB[0].name,
          surname: resultsDB[0].surname,
          patronymic: resultsDB[0].patronymic,
        },
        exp: Math.floor(Date.now() / 1000) + 60 * 30,
      },
      `MIICXAIBAAKBgQDHZ5+sW4/mGlQHkuGwO7c8iLPF4Aw`,
    );

    const newRes = resultsDB[0];
    res.status(200).json({
      token,
      userData: {
        name: newRes.name,
        surname: newRes.surname,
        patronymic: newRes.patronymic,
      },
    });
  } else {
    res.sendStatus(401);
  }
});

export default routerAuth;
