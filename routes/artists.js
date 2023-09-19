import { Router } from "express";
import connection from "../database.js";

const artistsRouter = Router();

artistsRouter.get("/", (request, response) => {
  const query = /*sql*/ `SELECT artists.*,
    artists.name AS artistName,
    artists.id AS artistId,
    tracks.name AS trackName,
    albums.name AS albumName
FROM artists

INNER JOIN artists_tracks
    ON artists.id = artists_tracks.artist_id
INNER JOIN tracks
    ON artists_tracks.track_id = tracks.id

INNER JOIN artists_albums
    ON artists.id = artists_albums.artist_id
INNER JOIN albums
    ON artists_albums.album_id = albums.id
`;

  connection.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
      response.status(500).json({ error: "An error occurred" });
    } else {
      const artists = prepareArtistData(results);
      response.json(artists);
    }
  });
});


artistsRouter.get("/:id", (request, response) => {
const id = request.params.id;

  const query = /*sql*/ `SELECT artists.*,
    artists.name AS artistName,
    artists.id AS artistId,
    tracks.name AS trackName,
    albums.name AS albumName
FROM artists

INNER JOIN artists_tracks
    ON artists.id = artists_tracks.artist_id
INNER JOIN tracks
    ON artists_tracks.track_id = tracks.id

INNER JOIN artists_albums
    ON artists.id = artists_albums.artist_id
INNER JOIN albums
    ON artists_albums.album_id = albums.id

WHERE artists.id = ?
`;

const values = [id];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      response.status(500).json({ error: "An error occurred" });
    } else {
      const artists = prepareArtistData(results);
      response.json(artists);
    }
  });
});





function prepareArtistData(results) {
  // Create an object to store posts with users as an array
  const artistsWithAlbumTracks = {};

  for (const artist of results) {
    // If the artist is not in the object, add it
    if (!artistsWithAlbumTracks[artist.id]) {
      artistsWithAlbumTracks[artist.id] = {
        id: artist.id,
        name: artist.artistName,
        // Add other artist properties here
        albums: [],
        tracks: [],
      };
    }

    // Add album information to the artist's users array
    if (!artistsWithAlbumTracks[artist.id].albums.find((a) => a.name === artist.albumName)) {
      artistsWithAlbumTracks[artist.id].albums.push({
        name: artist.albumName,
      });
    }

    if (!artistsWithAlbumTracks[artist.id].tracks.find((a) => a.name === artist.trackName)) {
      artistsWithAlbumTracks[artist.id].tracks.push({
        name: artist.trackName,
      });
    }
  }

  // Convert the object of posts into an array
  const artistArray = Object.values(artistsWithAlbumTracks);
  return artistArray;
}

export { artistsRouter };
