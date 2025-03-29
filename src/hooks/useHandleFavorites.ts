import axios from "axios";
import { useDispatch } from "react-redux";
import { setFavoriteList } from "../redux/user.slice";
const useHandleFavorites = () => {
  const dispatch = useDispatch();

  const addFavorite = async (artistId: string) => {
    try {
      const url = `/api/adduserfavorite/${artistId}`;
      const headers = {
        "Content-Type": "application/json",
      };
      const axiosOptions = {
        withCredentials: true,
        headers: headers,
      };
      const response = await axios.post(url, axiosOptions);
      dispatch(setFavoriteList(response.data.favoritesList));
      console.log("Favorite added");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFavorite = async (artistId: string) => {
    try {
      const url = `/api/deleteuserfavorite/${artistId}`;
      const headers = {
        "Content-Type": "application/json",
      };
      const axiosOptions = {
        withCredentials: true,
        headers: headers,
      };
      const response = await axios.post(url, axiosOptions);
      dispatch(setFavoriteList(response.data.favoritesList));

      console.log("Favorite deleted");
    } catch (err) {
      console.error(err);
    }
  };

  return { addFavorite, deleteFavorite };
};

export default useHandleFavorites;
