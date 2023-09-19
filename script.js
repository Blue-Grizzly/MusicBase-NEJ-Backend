import cors from "cors";
import express from "express";




import {getAllArtists, getArtist, getAllAlbums, getAlbum, getAllTracks, getTrack, searchArtist, searchTrack, searchAlbum} from "./queries.js"



const port = 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/artists", getAllArtists);
app.get("/artists/:artist_id", getArtist);

app.get("/albums", getAllAlbums);
app.get("/albums/:album_id", getAlbum);

app.get("/tracks", getAllTracks);
app.get("/trakcs/:track_id", getTrack);

app.get("/search/artists/:searchterm", searchArtist);
app.get("/search/albums/:searchterm", searchAlbum);
app.get("/search/tracks/:searchterm", searchTrack);

app.listen(port, () => {
  console.log(port);
});
