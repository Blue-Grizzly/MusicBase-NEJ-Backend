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
    const newTrack = request.body;
    console.log(newTrack);
    const values = [newTrack.name, newTrack.length, newTrack.name, newTrack.albums, newTrack.name, newTrack.artists]
    const query = /*sql*/ `
    INSERT INTO tracks (name, length) 
        VALUES (?,?);
    INSERT INTO tracks_albums (track_id, album_id)
        VALUES ((SELECT tracks.id FROM tracks WHERE name = ?),
                (SELECT albums.id FROM albums WHERE name = ?));
    INSERT INTO artists_tracks (track_id, artist_id)
        VALUES ((SELECT tracks.id FROM tracks WHERE name = ?),
                (SELECT artists.id FROM artists WHERE name = ?));
    `;
    //planen
    /*
    1. beskriv json data(req.body) hvordan det skal se ud. lav et eksempel. 
    2. hvis den skal bruge id får den et id så det er frontenden der giver den det rigtige id
    3. en query skal kun inholde en insert
    4. få id tilbage fra insertid
    5.lave den næste insert (tracks_albums) og artists_tracks

    */ 

    connection.query(query, values, (error, results, fields) => {
        if(error){
            response.status(500).json(error);
        } else {
            console.log("success");

//ekstra query - results.insertid giver os id vi skal brug i næste query sætte ind i value i query

            response.json(results);
    }});
});


tracksRouter.put("/:id", (request, response) => {
    const id = request.params.id;

//joins relevant tables for editing
    const query = /*sql*/ `

        UPDATE tracks
        INNER JOIN artists_tracks
            ON tracks.id = artists_tracks.track_id
        INNER JOIN artists
            ON artists_tracks.artist_id = artists.id
        INNER JOIN tracks_albums
            ON tracks.id = tracks_albums.track_id
        INNER JOIN albums
            ON tracks_albums.album_id = albums.id
        SET tracks.name = '${request.body.name}', 
            tracks.length = '${request.body.length}', 
            tracks_albums.album_id = 
                (SELECT albums.id FROM albums WHERE albums.name LIKE '${request.body.albums}'),
            artists_tracks.artist_id = 
                (SELECT artists.id FROM artists WHERE artists.name LIKE '${request.body.artists}')
        WHERE tracks.id = ${id} OR tracks_albums.track_id = ${id} OR artists_tracks.track_id = ${id};

    `;
    
    connection.query(query, (error, results, fields) =>{
        if(error){
            response.status(500).json(error);
        } else {
            response.json(results);
        }
    })
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

function prepareTrackData(results) {
    // create object to hold tracks
    const tracksWithArtistAlbum = {};

    //add all tracks not already in the object
    for (const track of results) {
        if (!tracksWithArtistAlbum[track.id]) {
            tracksWithArtistAlbum[track.id] = {
                id: track.id,
                name: track.trackName,
                length: track.length,
                artists: [],
                albums: []
            };
        }

        // Add the album and artist information to the arrays
        if(!tracksWithArtistAlbum[track.id].albums.find(a => a.name === track.albumName)){
        tracksWithArtistAlbum[track.id].albums.push({
            name: track.albumName,
            id: track.albumId
        });
    };
        if(!tracksWithArtistAlbum[track.id].artists.find(a => a.name === track.artistName))
        tracksWithArtistAlbum[track.id].artists.push({
            name: track.artistName,
            id: track.artistId
        });
    }

    // Convert the object of posts into an array
    const trackArray = Object.values(tracksWithArtistAlbum);
    return trackArray;
}