import axios from "axios";

const getSimilarArtists = async (req, res, next) => {
  try {
    if (req.isAuthenticated) {
      const token = req.artsyToken;
      const artistId = req.params.artistId;
      const headers = {
        "X-XAPP-Token": token,
      };

      const url = "https://api.artsy.net/api/artists";

      const params = {
        similar_to_artist_id: artistId,
      };

      const axiosOptions = {
        headers: headers,
        params: params,
      };

      const response = await axios.get(url, axiosOptions);
      req.similarArtistList = response.data._embedded.artists;
      return next();
    }
  } catch (error) {
    console.error(error);
  }
  req.similarArtistList = [];
  return next();
};

export default getSimilarArtists;
