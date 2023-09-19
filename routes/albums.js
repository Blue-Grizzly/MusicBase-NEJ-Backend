import { Router} from "express";
import connection from "../database.js";

const albumRouter = Router();

albumRouter.get("/", (request, response) => {
  const query = /*sql*/ `
   SELECT albums.*,

    albums.name AS albumName,
    tracks.name AS trackName,
    tracks.length AS trackLength,
    labels.name AS labelName,
    genres.name AS genreName,
    artists.name AS artistName
    

    FROM albums

    
    INNER JOIN artists_albums
        ON albums.id = artists_albums.album_id
    INNER JOIN artists
        ON artists_albums.artist_id = artists.id

    INNER JOIN tracks_albums
        ON albums.id = tracks_albums.album_id
    INNER JOIN tracks
        ON tracks_albums.track_id = tracks.id

    INNER JOIN albums_labels
        ON albums.id= albums_labels.album_id
    INNER JOIN labels
        ON albums_labels.label_id = labels.id

    INNER JOIN albums_genres
        ON albums.id = albums_genres.album_id
    INNER JOIN genres
        ON albums_genres.genre_id = genres.id;
`;

  connection.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
      response.status(500).json({ error: "An error occurred" });
    } else {
      const artists = prepareAlbumData(results);
      response.json(artists);
    }
  });
});


albumRouter.get("/:id", (request, response) => {
  const id = request.params.id;


  const query = /*sql*/ `
   SELECT albums.*,

    albums.name AS albumName,
    tracks.name AS trackName,
    tracks.length AS trackLength,
    labels.name AS labelName,
    genres.name AS genreName,
    artists.name AS artistName
    

    FROM albums

    INNER JOIN artists_albums
        ON albums.id = artists_albums.album_id
    INNER JOIN artists
        ON artists_albums.artist_id = artists.id

    INNER JOIN tracks_albums
        ON albums.id = tracks_albums.album_id
    INNER JOIN tracks
        ON tracks_albums.track_id = tracks.id

    INNER JOIN albums_labels
        ON albums.id= albums_labels.album_id
    INNER JOIN labels
        ON albums_labels.label_id = labels.id

    INNER JOIN albums_genres
        ON albums.id = albums_genres.album_id
    INNER JOIN genres
        ON albums_genres.genre_id = genres.id
    
    WHERE albums.id = ?;
`;

const values = [id]

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.log(err);
      response.status(500).json({ error: "An error occurred" });
    } else {
      const artists = prepareAlbumData(results);
      response.json(artists);
    }
  });
});




function prepareAlbumData(results) {
  // Create an object to store posts with users as an array
  const albumsWithAritstsTracks = {};

  for (const album of results) {
    // If the artist is not in the object, add it
    if (!albumsWithAritstsTracks[album.id]) {
      albumsWithAritstsTracks[album.id] = {
        id: album.id,
        name: album.albumName,
        // Add other properties here
        artists: [],
        tracks: [],
      };
    }

    // Add album information to the artist's users array
    if (!albumsWithAritstsTracks[album.id].artists.find((a) => a.name === album.artistName)) {
      albumsWithAritstsTracks[album.id].artists.push({
        name: album.artistName
      });
    }

    


    if (!albumsWithAritstsTracks[album.id].tracks.find((a) => a.name === album.trackName)) {
      albumsWithAritstsTracks[album.id].tracks.push({
        name: album.trackName
      });
    }
  }

  // Convert the object of posts into an array
  const artistArray = Object.values(albumsWithAritstsTracks);
  return artistArray;
}



export { albumRouter };
