import { Router } from "express";
import connection from "../database.js";

const artistsRouter = Router();
// inner vælger at artist kan kun vælge det der har artist og har track og albums
artistsRouter.get("/", (request, response) => {
  
  const query = /*sql*/ `
  SELECT *
  FROM artists;
`;

  connection.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
      response.status(500).json({ error: "An error occurred" });
    } else {
     
      response.json(results);
    }
  });
});


artistsRouter.get("/:id", (request, response) => {
const id = request.params.id;

  const artistQuery = /*sql*/ `
  SELECT *
  FROM artists
  WHERE artists.id = ?
`;



const values = [id];

  connection.query(artistQuery, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      response.status(500).json({ error: "An error occurred" });
    } else {

      const artist = {
        name: results[0].name,
        image: results[0].image,
        birthday: results[0].birthday,
        activeSince: results[0].activeSince,
        labels: results[0].labels,
        website: results[0].website,
        genres: results[0].genres,
        description: results[0].description,
        albums: []
      }
      // console.log(results);
      const albumQuery = /*sql*/ `
      SELECT * 
      FROM albums
      INNER JOIN artists_albums
      ON albums.id = artists_albums.album_id
      WHERE artists_albums.artist_id = ?
      `
      connection.query(albumQuery, values, (err, results, fields) => {
        if(err){
          response.status(500).json(err);
        } else {
          for (const album of results) {
            artist.albums.push(album);
          }
          console.log(results);
        }

        response.json(artist);
      })
      

      
    }
  });
});

artistsRouter.post("/", (request, response) =>{
  
  const artist = request.body;
  //flere properties se jeres første opgave
  const values = [
    artist.name,
    artist.image,
    artist.description,
    artist.birthday,
    artist.activeSince,
    artist.labels,
    artist.website,
    artist.genres
  ];

  const query = `INSERT INTO artists  (name, image, description, birthday, activeSince, labels, website, genres) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log(err)
      response.json(results);
    }

  });
});

artistsRouter.delete((request, response) =>{
const id = request.params.id;
const query = /*sql*/ `
DELETE FROM artists_albums WHERE artist_id = '${id}';
DELETE FROM artists_tracks WHERE artist_id = '${id}';
DELETE FROM artists_labels WHERE artist_id = '${id}';
DELETE FROM artists_genres WHERE artist_id = '${id}';

DELETE FROM artists WHERE id='${id}'`;


connection.query(query, values, (err, resulsts, fields) => {
if(err){
  console.log(err)
} else{
  response.json(resulsts);
}
});
});




export { artistsRouter };
