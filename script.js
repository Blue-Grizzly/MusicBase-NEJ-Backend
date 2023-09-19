import cors from "cors";
import express from "express";
import tracksRouter from "./routes/tracks.js";


const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tracks", tracksRouter);

app.listen(port, () => {
  console.log(port);
});
