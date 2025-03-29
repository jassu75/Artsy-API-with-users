import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setFavoriteListIds,
  setFavoriteList,
  setUser,
} from "../redux/user.slice";
import { TypeFavorite } from "../UnauthorisedControls/unauthorizedControl.types";

const useCheckAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const headers = {
          "Content-Type": "application/json",
        };
        const axiosOptions = {
          withCredentials: true,
          headers: headers,
        };
        const url = "/api/retrievefavoritelist";
        const response = await axios.get(url, axiosOptions);
        setAuthenticated(true);
        dispatch(setUser(response.data.user));
        dispatch(setFavoriteList(response.data.favoritesList));
        const favoriteListIds = response.data.favoritesList.map(
          (favorite: TypeFavorite) => favorite.artistId
        );
        dispatch(setFavoriteListIds(favoriteListIds));
      } catch (error) {
        setAuthenticated(false);
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  return { authenticated, loading };
};

export default useCheckAuth;
