import axios from "axios";

export const getCategory = async (req, res, next) => {
  const artworkId = req.params.artworkId;
  const token = req.artsyToken;
  const url = "https://api.artsy.net/api/genes";

  const headers = {
    "X-XAPP-Token": token,
  };

  const params = {
    artwork_id: artworkId,
  };

  const axiosOptions = {
    headers: headers,
    params: params,
  };

  const response = await axios.get(url, axiosOptions);
  req.category = response.data;
  next();
};
