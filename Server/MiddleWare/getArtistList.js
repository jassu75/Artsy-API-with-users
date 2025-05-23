import axios from "axios";

export const getArtistList = async (req, res, next) => {
  try {
    const token = req.artsyToken;
    const searchText = req.params.artistName;
    const headers = {
      "X-XAPP-Token": token,
    };

    const url = "https://api.artsy.net/api/search";

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
