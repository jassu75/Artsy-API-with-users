import axios from "axios";

export const getArtWorks = async (req, res, next) => {
  const artistId = req.params.artistId;
  const token = req.token;
  const url = "https://api.artsy.net/api/artworks";

  const headers = {
    "X-XAPP-Token": token,
  };

  const params = {
    artist_id: artistId,
    size: 10,
  };

  const axiosOptions = {
    headers: headers,
    params: params,
  };

  const response = await axios.get(url, axiosOptions);
  req.artWorks = response.data;
  next();
};
