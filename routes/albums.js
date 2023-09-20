import { Router} from "express";
import connection from "../database.js";

const albumsRouter = Router();
// måske kun være albums info. behøver ikke at være der (peter)
// hent al info om album
albumsRouter.get("/", (request, response) => {
  const query = /*sql*/ `
  SELECT *
  FROM albums
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


albumsRouter.get("/:id", (request, response) => {
  // vil gerne have info om specifikt album med list over sange osv.
  const id = request.params.id;


  
  const albumQuery = /*sql*/ `
   SELECT *
    FROM albums
    where id = ?`
   

const values = [id]

  connection.query(albumQuery, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      response.status(500).json({ error: "An error occurred" });
    } else {

    
      // TODO: Fyld info fra results ind i album
console.log(results);
    
        // Nu står der album-info i results ...
      const album = {
      name: results[0].name,
      image:results[0].image,
        tracks: []
      };

      

      const trackQuery = /*sql*/`
        SELECT * FROM tracks
        INNER JOIN tracks_albums
        ON tracks.id = tracks_albums.track_id
        WHERE tracks_albums.album_id = ?`

        connection.query(trackQuery, values, (err, results, fields) => {

          // hvis der ikke er nogen fejl ...
          if(err){
            response.status(500).json(err);
          }else {// nu står der et array af track-info i results
          // TODO: Loop igennem de tracks, og put dem ind i album fra før ...
            for (const track of results) {
              album.tracks.push(track);
            }
          }
          // OG send så album som json
           response.json(album);
        });   
    }
  });
});


albumsRouter.delete((request, response) =>{
const id = request.params.id;
const query = /*sql*/ `
DELETE FROM artists_albums WHERE album_id = '${id}';
DELETE FROM tracks_albums WHERE album_id = '${id}';
DELETE FROM albums WHERE id='${id}'`;


connection.query(query, values, (err, resulsts, fields) => {
if(err){
  console.log(err)
} else{
  response.json(resulsts);
}
});
});


export { albumsRouter }
