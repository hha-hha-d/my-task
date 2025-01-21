import express from "express";
const searchPers = express.Router();

import { getPersonDB } from "../handlers/data_base/get_person_db.js";

searchPers.post("/search_person", async (req, res) => {
  const values = req.body.value.trim().split(" ");
  const result = await getPersonDB(values);
  console.log(result);
  if (result.length !== 0) {
    res.status(200).json(result);
    return;
  } else {
    res.status(303);
  }
});

export default searchPers;
