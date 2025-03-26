import axios from "axios";

export const getArtsyToken = async (req, res, next) => {
  try {
    const url = "https://api.artsy.net/api/tokens/xapp_token";
    const data = {
      client_id: "2d13a19c648777b9910a",
      client_secret: "00ef8863b38e32a0e5c0d94ce095e52d",
    };

    const response = await axios.post(url, data);
    const token = response.data.token;
    req.artsyToken = token;
  } catch (error) {
    console.log(error);
  }
  next();
};
