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

app.get("/albums", getAllAlbums);
app.get("/albums/:id", getAlbum);

app.get("/tracks", getAllTracks);
app.get("/trakcs/:id", getTrack);

app.get("/search/artists/:searchterm", searchArtist);
app.get("/search/albums/:searchterm", searchAlbum);
app.get("/search/tracks/:searchterm", searchTrack);

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
  const id = request.params.artist_id;

  const query = `SELECT * FROM artists WHERE artist_id=?`; //this and the params. must be identical to that of the database coloumn
  const values = [id]; //skriver sådan fordi sql injection noget med sikkerhed!!!!

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      response.json(results[0]);
    }
  });
}

function getAllAlbums(req, res) {
  // const artists = await readFileParseJson();

  const query = `SELECT * FROM albums`;

  connection.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  });
}

function getAlbum(request, response) {
  const id = request.params.id;

  const query = `SELECT * FROM albums WHERE id=?`;
  const values = [id]; //skriver sådan fordi sql injection noget med sikkerhed!!!!

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      response.json(results[0]);
    }
  });
}

function getAllTracks(req, res) {
  // const artists = await readFileParseJson();

  const query = `SELECT * FROM tracks`;

  connection.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  });
}

function getTrack(request, response) {
  const id = request.params.id;

  const query = `SELECT * FROM tracks WHERE id=?`;
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
  const query = `SELECT * FROM artists WHERE artist_name LIKE "%${searchterm}%"`;

  connection.query(query, (err, results, fields) => {
    response.json(results);
  });
}

function searchAlbum(request, response) {
  const searchterm = request.params.searchterm;
  const query = `SELECT * FROM albums WHERE album_name LIKE "%${searchterm}%"`;

  connection.query(query, (err, results, fields) => {
    response.json(results);
  });
}

function searchTrack(request, response) {
  const searchterm = request.params.searchterm;
  const query = `SELECT * FROM tracks WHERE track_name LIKE "%${searchterm}%"`;

  connection.query(query, (err, results, fields) => {
    response.json(results);
  });
}

app.listen(port, () => {
  console.log("server started at port 3000");
});
