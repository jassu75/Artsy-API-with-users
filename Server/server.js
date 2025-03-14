import express from "express";
import { getArtsyToken } from "./MiddleWare/getArtsyToken.js";
import { getArtistList } from "./MiddleWare/getArtistList.js";
import { getArtistInfo } from "./MiddleWare/getArtistInfo.js";
const app = express();

//ArtistList

app.get("/api/search/:artistName", getArtsyToken, getArtistList, (req, res) => {
  res.json(req.artistList);
});

//artistInfo

app.get(
  "/api/artistinfo/:artistId",
  getArtsyToken,
  getArtistInfo,
  (req, res) => {
    res.json(req.artistInfo);
  }
);

app.listen(5000, () => {
  console.log(`Server started successfully`);
});
