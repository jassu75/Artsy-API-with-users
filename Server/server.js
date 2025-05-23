import express from "express";
import { getArtsyToken } from "./MiddleWare/getArtsyToken.js";
import { getArtistList } from "./MiddleWare/getArtistList.js";
import { getArtistInfo } from "./MiddleWare/getArtistInfo.js";
import { getCategory } from "./MiddleWare/getCategory.js";
import "dotenv/config";
import connectToDb from "./Database/connection.js";
import addRegisteredUser from "./Database/addRegisteredUser.js";
import cookieParser from "cookie-parser";
import checkAuth from "./MiddleWare/checkAuth.js";
import logout from "./MiddleWare/logout.js";
import loginUser from "./Database/loginUser.js";
import deleteUser from "./Database/deleteUser.js";
import addUserFavorite from "./Database/addUserFavorite.js";
import retrieveFavoriteList from "./Database/retrieveFavoriteList.js";
import deleteUserFavorite from "./Database/deleteUserFavorite.js";
import path from "path";
import getArtistDetails from "./MiddleWare/getArtistDetails.js";

const app = express();
const buildFilePath = path.join(process.cwd(), "dist");
app.use(express.json());
app.use(cookieParser());
app.use(express.static(buildFilePath));

//Database connection

connectToDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });

//ArtistList

app.get("/api/search/:artistName", getArtsyToken, getArtistList, (req, res) => {
  return res.json(req.artistList);
});

//ArtistDetails

app.get(
  "/api/artistdetails/:artistId",
  getArtsyToken,
  checkAuth,
  getArtistDetails,
  (req, res) => {
    const result = {
      artistInfo: req.artistInfo,
      artWorks: req.artWorks,
      similarArtistList: req.similarArtistList,
    };

    return res.status(200).json(result);
  }
);

//categories

app.get("/api/category/:artworkId", getArtsyToken, getCategory, (req, res) => {
  return res.json(req.category);
});

app.post("/api/db/register", addRegisteredUser, (req, res) => {
  if (!req.isAuthenticated) {
    return res.status(401).json({ authenticated: false });
  } else {
    return res.status(201).json({
      authenticated: true,
      user: {
        email: req.user.email,
        fullname: req.user.fullname,
        profileUrl: req.user.profileUrl,
      },
      favoritesList: req.favoritesList,
    });
  }
});

app.post("/api/db/login", loginUser, (req, res) => {
  if (!req.isAuthenticated) {
    return res.status(401).json({ authenticated: false });
  } else {
    return res.status(201).json({
      authenticated: true,
      user: {
        email: req.user.email,
        fullname: req.user.fullname,
        profileUrl: req.user.profileUrl,
      },
      favoritesList: req.favoritesList,
    });
  }
});

app.post("/api/logout", logout, (req, res) => {
  return res.status(201).json("Cookie cleared");
});

app.post("/api/deleteaccount", deleteUser, logout, (re1, res) => {
  return res.json("Account deleted successfully");
});

app.get("/api/checkAuth", checkAuth, (req, res) => {
  if (!req.isAuthenticated) {
    return res.status(401).json({ authenticated: false });
  } else {
    return res.status(200).json({
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
  "/api/retrievefavoritelist/:email",
  retrieveFavoriteList,
  (req, res) => {
    return res.status(200).json(req.favoritesList);
  }
);

app.post(
  "/api/adduserfavorite/:artistId",
  checkAuth,
  getArtsyToken,
  getArtistInfo,
  addUserFavorite,
  (req, res) => {
    if (req.favoritesList) {
      return res.status(201).json({
        message: "added favorite",
        favoritesList: req.favoritesList,
      });
    } else {
      return res.status(401).json({
        message: "Failed to add favorite",
      });
    }
  }
);

app.post(
  "/api/deleteuserfavorite/:artistId",
  checkAuth,
  deleteUserFavorite,
  (req, res) => {
    if (req.favoritesList) {
      return res.status(201).json({
        message: "deleted favorite",
        favoritesList: req.favoritesList,
      });
    } else {
      return res.status(401).json({
        message: "Failed to delete favorite",
      });
    }
  }
);

app.get("*", (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  return res.sendFile(path.join(buildFilePath, "index.html"));
});
