import express from "express";

import { __dirname } from "../dirname.js";
import path from "node:path";
import cors from "cors";

import jwt from "jsonwebtoken";
import routerAuth from "./routes/auth.js";
import searchPers from "./routes/search_person.js";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

app.use(routerAuth);
app.post("/checkToken", (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(
      token,
      `MIICXAIBAAKBgQDHZ5+sW4/mGlQHkuGwO7c8iLPF4Aw`,
      (err, decoded) => {
        if (!err) {
          res.status(200).json(decoded.data);
          return;
        }
      }
    );
  }

  res.sendStatus(401);
});

app.use((req, res, next) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(
      token,
      `MIICXAIBAAKBgQDHZ5+sW4/mGlQHkuGwO7c8iLPF4Aw`,
      (err, decoded) => {
        if (!err) {
          next();
        }
      }
    );
    return;
  }

  res.sendStatus(401);
});

app.use(searchPers);

app.listen(port, () => {
  console.log("Сервер nodeJS запущен на 3000 порту.");
});
