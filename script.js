import cors from "cors";
import express from "express";
// import fs from "fs/promises"; #cargoProgrammør HAHAHA
import { connection } from "./database.js";

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/artists", getAllArtists);
app.get("/artists/:id", getArtist);

app.get("/search/artists:searchterm", searchArtist);
app.get("/search/albums:searchterm", searchAlbum);
app.get("/search/tracks:searchterm", searchTrack);

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

function searchArtist(request, response) {
  const searchterm = request.params.searchterm;
  const query = `SELECT * FROM artits WHERE name LIKE "%${searchterm}%"`;

  connection.query(query, (err, results, fields) => {
    response.json(results);
  });
}

function searchAlbum(request, response) {
  const searchterm = request.params.searchterm;
  const query = `SELECT * FROM albums WHERE name LIKE "%${searchterm}%"`;

  connection.query(query, (err, results, fields) => {
    response.json(results);
  });
}

function searchTrack(request, response) {
  const searchterm = request.params.searchterm;
  const query = `SELECT * FROM tracks WHERE name LIKE "%${searchterm}%"`;

  connection.query(query, (err, results, fields) => {
    response.json(results);
  });
}

app.listen(port, () => {
  console.log("server started at port 3000");
});
