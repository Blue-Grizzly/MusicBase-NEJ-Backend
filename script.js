import cors from "cors";
import express from "express";
import fs from "fs/promises";
import { connection } from "database.js";

app.use(express.json());
app.use(cors());

app.get("/artists", getAllArtists);
app.get("/artists/:id", getArtist);

app.get("")
function getAllArtists(req, res) {
  // const artists = await readFileParseJson();

  const query = `SELECT * FROM artists`;

  connection.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  });
}

function getArtist(request, response) {
  const id = request.params.id;

  const query = `SELECT * FROM artists WHERE id=?`;
  const values = [id]; //skriver sådan fordi sql injection noget med sikkerhed!!!!
 
  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      response.json(results[0]);
    }
  });
}
