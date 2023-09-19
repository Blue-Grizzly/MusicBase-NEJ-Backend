import cors from "cors";
import express from "express";
import tracksRouter from "./routes/tracks.js";
import { artistsRouter } from "./routes/artists.js";
import { albumRouter } from "./routes/albums.js";



const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tracks", tracksRouter);
app.use("/artists", artistsRouter);

app.use("/albums", albumRouter);


// app.get("/search/artists/:searchterm", searchArtist);

// app.get("/search/albums/:searchterm", searchAlbum);


// app.get("/search/tracks/:searchterm", searchTrack);
// app.get("/search/all/:searchterm", searchAll);


app.listen(port, () => {
  console.log(port);
});
