import { Router } from "express";
import connection from "../database.js";

const tracksRouter = Router();

tracksRouter.get("/", (request, response) => {
    // sql query to select all from the table artists
    const query = /*sql*/ `
        SELECT tracks.*,
            tracks.name AS trackName,
            artists.name AS artistName,
            tracks.id AS trackId,
            artists.id AS artistId,
            albums.name AS albumName,
            albums.id AS albumId
        FROM tracks
        INNER JOIN artists_tracks
            ON tracks.id = artists_tracks.track_id
        INNER JOIN artists
            ON artists_tracks.artist_id = artists.id
        INNER JOIN tracks_albums
            ON tracks.id = tracks_albums.track_id
        INNER JOIN albums
            ON tracks_albums.album_id = albums.id;
`;
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
            // Handle error and send an error response if needed
            response.status(500).json({ error: "An error occurred" });
        } else {
            const tracks = prepareTrackData(results);
            response.json(tracks);
        }
    });
});

tracksRouter.get("/:id", (request, response) => {
    const id = request.params.id;

    // sql query to select all from the table posts
const query = /*sql*/ `
    SELECT tracks.*,
        tracks.name AS trackName,
        artists.name AS artistName,
        tracks.id AS trackId,
        artists.id AS artistId,
        albums.name AS albumName,
        albums.id AS albumId
    FROM tracks
    INNER JOIN artists_tracks
        ON tracks.id = artists_tracks.track_id
    INNER JOIN artists
        ON artists_tracks.artist_id = artists.id
    INNER JOIN tracks_albums
        ON tracks.id = tracks_albums.track_id
    INNER JOIN albums
        ON tracks_albums.album_id = albums.id
    WHERE tracks.id = ?;
`;
    const values = [id];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.log(error);
            // Handle error and send an error response if needed
            response.status(500).json({ error: "An error occurred" });
        } else {
            // Prepare the data - array of posts with users array for each post object
            const track = prepareTrackData(results);
            // Send the formatted data as JSON response
            response.json(track);
        }
    });
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
        tracksWithArtistAlbum[track.id].albums.push({
            name: track.albumName,
            id: track.albumId
        });
        tracksWithArtistAlbum[track.id].artists.push({
            name: track.artistName,
            id: track.artistId
        });
    }

    // Convert the object of posts into an array
    const trackArray = Object.values(tracksWithArtistAlbum);
    return trackArray;
}