import express from "express";
import { getArtsyToken } from "./MiddleWare/getArtsyToken.js";
import { getArtistList } from "./MiddleWare/getArtistList.js";
import { getArtistInfo } from "./MiddleWare/getArtistInfo.js";
import { getArtWorks } from "./MiddleWare/getArtworks.js";
import { getCategory } from "./MiddleWare/getCategory.js";
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

app.get("/api/artworks/:artistId", getArtsyToken, getArtWorks, (req, res) => {
  res.json(req.artWorks);
});

app.get("/api/category/:artworkId", getArtsyToken, getCategory, (req, res) => {
  res.json(req.category);
});

app.listen(5000, () => {
  console.log(`Server started successfully`);
});
