import cors from "cors";
import express from "express";
import tracksRouter from "./routes/tracks.js";
import { artistsRouter } from "./routes/artists.js";
import { albumsRouter } from "./routes/albums.js";
import { searchRouter } from "./routes/search.js";

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

// necessary access the web page
app.get("/", (request, response)=>{
    response.end("App running! Data on /artists, /albums, /tracks & /search");
})

app.use("/tracks", tracksRouter);
app.use("/artists", artistsRouter);

app.use("/albums", albumsRouter);

app.use("/search", searchRouter)


app.listen(port, () => {
  console.log(port);
});
