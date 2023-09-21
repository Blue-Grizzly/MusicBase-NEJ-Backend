import { Router } from "express";
import connection from "../database.js";

const tracksRouter = Router();

tracksRouter.get("/", (request, response) => {
    // sql query to select all from the table artists
    const query = /*sql*/ `
        SELECT *
        FROM tracks
        
`;
    connection.query(query, (error, results, fields) => {
        if (error) {
            // Handle error and send an error response if needed
            response.status(500).json({ error: "An error occurred" });
        } else {
            response.json(results);
        }
    });
});

tracksRouter.get("/:id", (request, response) => {
    const id = request.params.id;

    // sql query to select all from the table posts
const trackQuery = /*sql*/ `
    SELECT *
    FROM tracks
    WHERE tracks.id = ?`;

    const values = [id,id]

    connection.query(trackQuery, values, (err, results, fields) => {
        if (err) {
            // Handle error and send an error response if needed
            response.status(500).json( err);
        } else {
               
            const track = {
                name: results[0].name,
                length: results[0].length,
                artist: [],
                album: []
            };

            const artistQuery = /*sql*/ `
            SELECT *
            FROM artists
            INNER JOIN artists_tracks
            ON artists.id = artists_tracks.artist_id
            WHERE artists_tracks.track_id = ?;
            
            SELECT *
            FROM albums
            INNER JOIN tracks_albums
            ON albums.id = tracks_albums.album_id
            WHERE  tracks_albums.track_id = ?
            `

            connection.query(artistQuery, values, (err,results,fields) =>{
                if(err){
                    response.status(500).json(err);
                } else{
                    for (const artist of results[0]) {
                        track.artist.push(artist);
                    }
                    for (const album of results[1]) {
                        track.album.push(album);
                    }


                    
                }
                response.json(track);
            })
        }
    });
});

//farligt søger efter navn og de kan være det samme
tracksRouter.post("/", (request, response) =>{

    //frontend en dropdown menu hvor kunstneren vælges og derfor har et id.

    const newTrack = request.body;

    const values = [newTrack.name, newTrack.length]


    const trackQuery = /*sql*/ `
    INSERT INTO tracks (name, length) VALUES (?,?);
    `;
    //planen
    /*
    1. beskriv json data(req.body) hvordan det skal se ud. lav et eksempel. 
    2. hvis den skal bruge id får den et id så det er frontenden der giver den det rigtige id
    3. en query skal kun inholde en insert
    4. få id tilbage fra insertid
    5.lave den næste insert (tracks_albums) og artists_tracks
*/




    connection.query(trackQuery, values, (error, results, fields) => {
        if(error){
            response.status(500).json(error);
        } else {
            const newTrackId = results.insertId;
            
        for (const artist of newTrack.artist) {
            
            const artistTrackQuery = /*sql*/`
            INSERT INTO artists_tracks (artist_id, track_id) VALUES (?,?);
            `
            const artistTrackValues = [
                artist.id,
                newTrackId
            ];

            connection.query(artistTrackQuery, artistTrackValues, (err,results, fields) =>{
                 if(err){
                    response.status(500).json(err);
                } else {
                    return
                }
            })

            
        } for (const album of newTrack.album) {
            const albumTracksQuery = /*sql*/ `
            INSERT INTO tracks_albums(track_id, album_id) VALUES (?,?);
            `

        const trackAlbumValues = [
            newTrackId,
            album.id
           
        ]

        connection.query(albumTracksQuery, trackAlbumValues, (err,results, fields)=>{
              if(err){
                    response.status(500).json(err);
                } else {
                    return
                }
        }
        )}
       
//ekstra query - results.insertid giver os id vi skal brug i næste query sætte ind i value i query

    }});

     response.json({message: "Track created"});
});


tracksRouter.put("/:id", (request, response) => {
    const id = request.params.id;
    
    const track = request.body;
    
    const query = /*sql*/ `
    
    UPDATE tracks
    SET name = ?, length = ?
    WHERE tracks.id = ?
    `
    
    const values = [
            track.name,
            track.length,
            id];
    
        connection.query(query, values, (err,results, fields) => {
          if(err){
            console.log(err);
                  response.status(500).json(err);
          } else{
            console.log(err);
            response.json(results);
          }
        });
    });


tracksRouter.delete("/:id", (request, response) => {
    const id = request.params.id;

    //remember to delete junction table entrances first
    const query = /*sql*/ `
    DELETE FROM tracks_albums WHERE track_id = '${id}';
    DELETE FROM artists_tracks WHERE track_id = '${id}';
    DELETE FROM tracks WHERE id = '${id}';
    `;
    
    connection.query(query, (error, results, fields) =>{
        if(error){
            response.status(500).json(error);
        } else {
            response.json(results);
        }
    })
});




export default tracksRouter;