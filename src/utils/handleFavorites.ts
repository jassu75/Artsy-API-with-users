import axios from "axios";

export const addFavorite = async (artistId: string) => {
  try {
    const url = `/api/adduserfavorite/${artistId}`;
    const headers = {
      "Content-Type": "application/json",
    };
    const axiosOptions = {
      withCredentials: true,
      headers: headers,
    };
    await axios.post(url, axiosOptions);
    console.log("Favorite added");
  } catch (err) {
    console.error(err);
  }
};

export const deleteFavorite = async (artistId: string) => {
  try {
    const url = `/api/deleteuserfavorite/${artistId}`;
    const headers = {
      "Content-Type": "application/json",
    };
    const axiosOptions = {
      withCredentials: true,
      headers: headers,
    };
    await axios.post(url, axiosOptions);
    console.log("Favorite deleted");
  } catch (err) {
    console.error(err);
  }
};
