// import fs from "fs";
import "dotenv/config";
import { connection } from "./database.js";
// import mysql from "mysql2";

// const pEnv = process.env;

// const dbconfig = {
//   host: pEnv.MYSQL_HOST,
//   user: pEnv.MYSQL_USER,
//   database: pEnv.MYSQL_DATABASE,
//   password: pEnv.MYSQL_PASSWORD,
//   multipleStatements: true,
// };

// if (process.env.MYSQL_CERT) {
//   dbconfig.ssl = { cs: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") };
// }

// const connection = mysql.createConnection(dbconfig);

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
  const id = request.params.album_id;

  const query = `SELECT * FROM albums WHERE album_id=?`;
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
  const id = request.params.track_id;

  const query = `SELECT * FROM tracks WHERE track_id=?`;
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

export {
  getAllArtists,
  getArtist,
  getAllAlbums,
  getAlbum,
  getAllTracks,
  getTrack,
  searchArtist,
  searchTrack,
  searchAlbum,
};
