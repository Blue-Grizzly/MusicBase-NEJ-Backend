import { Router, response} from "express";
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

albumsRouter.post("/", (request, response) =>{
const album = request.body;

const values = [
  album.name,
  album.image
];

const albumQuery = /*sql */ `
INSERT INTO albums (name, image) VALUES (?, ?);
`

connection.query(albumQuery,values, (err,results, fields) =>{
  if(err){
    response.status(500).json(err);
  }else{
    const newAlbumId = results.insertId;


    for (const track of album.tracks) {
      const trackQuery = /*sql*/ `
      INSERT INTO tracks (name, length) VALUES(?,?);
      `
      const trackValues = [
        track.name,
        track.length
      ];

      connection.query(trackQuery, trackValues, (err,results,fields) =>{
        if(err){
        response.status(500).json(err);
        } else {

          const newTrackId = results.insertId;

          const albumTracksQuery = /*sql*/ `
          INSERT INTO tracks_albums (track_id, album_id) VALUES (?, ?)
          `

          const albumTracksValues = [
            newTrackId,
            newAlbumId
          ];

          connection.query(albumTracksQuery,albumTracksValues, (err, results,fields)=>{
             if(err){
              response.status(500).json(err);
            } else {
               return; //stopper flow
            }
          })
        }
      })
    }

    for (const artist of album.artists) {
      const artistkQuery = /*sql*/ 
  `INSERT INTO artists  (name, image, description, birthday, activeSince, labels, website, genres) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      
      const artistValues = [
        artist.name,
        artist.image,
        artist.description,
        artist.birthday,
        artist.activeSince,
        artist.labels,
        artist.website,
        artist.genres
      ];

      connection.query(artistkQuery, artistValues, (err,results,fields) =>{
        if(err){
        response.status(500).json(err);
        } else {

          const newArtistId = results.insertId;

          const artistAlbumsQuery = /*sql*/ `
          INSERT INTO tracks_albums (track_id, album_id) VALUES (?, ?)
          `

          const artistAlbumValues = [
            newArtistId,
            newAlbumId
          ];

          connection.query(artistAlbumsQuery,artistAlbumValues, (err, results,fields)=>{
             if(err){
              response.status(500).json(err);
            } else {
               return; //stopper flow
            }
          })
        }
      })
    }

    response.json({message: "Album posted" });

  }
})

})

albumsRouter.delete("/:id",(request, response) =>{
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
