import axios from "axios";

export const getArtistInfo = async (req, res, next) => {
  const artistId = req.params.artistId;
  const token = req.token;
  const url = "https://api.artsy.net/api/artists/" + artistId;

  const headers = {
    "X-XAPP-Token": token,
  };

  const axiosOptions = {
    headers: headers,
  };

  const response = await axios.get(url, axiosOptions);
  req.artistInfo = response.data;
  next();
};
