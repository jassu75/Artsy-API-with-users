import express from "express";
import { getArtsyToken } from "./MiddleWare/getArtsyToken.js";
import { getArtistList } from "./MiddleWare/getArtistList.js";
import { getArtistInfo } from "./MiddleWare/getArtistInfo.js";
import { getArtWorks } from "./MiddleWare/getArtworks.js";
import { getCategory } from "./MiddleWare/getCategory.js";
import "dotenv/config";
import connectToDb from "./Database/connection.js";
import addRegisteredUser from "./Database/addRegisteredUser.js";
import cookieParser from "cookie-parser";
import retrieveUsers from "./Database/retrieveUsers.js";
import checkAuth from "./MiddleWare/checkAuth.js";
import logout from "./MiddleWare/logout.js";
import loginUser from "./Database/loginUser.js";
import deleteUser from "./Database/deleteUser.js";
import getSimilarArtists from "./MiddleWare/getSimilarArtists.js";
const app = express();
app.use(express.json());
app.use(cookieParser());

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

//artworks

app.get("/api/artworks/:artistId", getArtsyToken, getArtWorks, (req, res) => {
  res.json(req.artWorks);
});

//categories

app.get("/api/category/:artworkId", getArtsyToken, getCategory, (req, res) => {
  res.json(req.category);
});

//Database connection

connectToDb()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });

app.post("/api/db/register", addRegisteredUser);

app.post("/api/db/login", loginUser);

app.post("/api/logout", logout, (req, res) => {
  res.status(201).json("Cookie cleared");
});

app.post("/api/deleteaccount", deleteUser, logout, (re1, res) => {
  res.json("Account deleted successfully");
});

app.get("/api/checkauth", checkAuth, (req, res) => {
  if (!req.isAuthenticated) {
    res.status(401).json({ authenticated: false });
  } else {
    res.status(200).json({
      authenticated: true,
      user: {
        email: req.user.email,
        fullname: req.user.fullname,
        profileUrl: req.user.profileUrl,
      },
    });
  }
});

app.get(
  "/api/similarartists/:artistId",
  getArtsyToken,
  checkAuth,
  getSimilarArtists,
  (req, res) => {
    const result = {
      authenticated: req.isAuthenticated,
      similarArtistList: req.similarArtistList,
    };

    return res.status(req.isAuthenticated ? 200 : 401).json(result);
  }
);
