import axios from "axios";

const getArtWorks = async (artistId, token) => {
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
  return response.data;
};

const getArtistInfo = async (artistId, token) => {
  const url = "https://api.artsy.net/api/artists/" + artistId;

  const headers = {
    "X-XAPP-Token": token,
  };

  const axiosOptions = {
    headers: headers,
  };

  const response = await axios.get(url, axiosOptions);
  return response.data;
};

const getSimilarArtists = async (artistId, token, authenticated) => {
  try {
    if (authenticated) {
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
      return response.data._embedded.artists;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getArtistDetails = async (req, res, next) => {
  const artistId = req.params.artistId;
  const token = req.artsyToken;
  const authenticated = req.isAuthenticated;
  req.artWorks = await getArtWorks(artistId, token);
  req.artistInfo = await getArtistInfo(artistId, token);
  req.similarArtistList = await getSimilarArtists(
    artistId,
    token,
    authenticated
  );
  next();
};

export default getArtistDetails;
