import axios from "axios";
import express from "express";

const app = express();

//get artsy token

const getArtsyToken = async (req, res, next) => {
  try {
    const url = "https://api.artsy.net/api/tokens/xapp_token";
    const data = {
      client_id: "2d13a19c648777b9910a",
      client_secret: "00ef8863b38e32a0e5c0d94ce095e52d",
    };

    const response = await axios.post(url, data);
    const token = response.data.token;
    req.token = token;
  } catch (error) {
    console.log(error);
  }
  next();
};

const searchArtists = async (req, res, next) => {
  try {
    const token = req.token;
    const searchText = req.params.artistName;
    const headers = {
      "X-XAPP-Token": token,
    };

    const url = "https://api.artsy.net/api/search?q=Andy+Warhol";

    const params = {
      type: "artist",
      size: 10,
      q: searchText,
    };

    const axiosOptions = {
      headers: headers,
      params: params,
    };

    const response = await axios.get(url, axiosOptions);
    req.artistList = response.data._embedded.results;
  } catch (error) {
    console.log(error);
  }
  next();
};

app.get("/api/search/:artistName", getArtsyToken, searchArtists, (req, res) => {
  res.json(req.artistList);
});

app.listen(5000, () => {
  console.log(`Server started successfully`);
});
