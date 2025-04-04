import { useState } from "react";
import {
  TypeFavorite,
  TypeUserLogin,
} from "../UnauthorisedControls/unauthorizedControl.types";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setAuthentication,
  setFavoriteList,
  setFavoriteListIds,
  setUser,
} from "../redux/user.slice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (loginData: TypeUserLogin) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const axiosOptions = {
        headers: headers,
      };
      const url = "/api/db/login";
      setError(false);
      const response = await axios.post(url, loginData, axiosOptions);
      dispatch(setAuthentication(true));
      dispatch(setUser(response.data.user));
      dispatch(setFavoriteList(response.data.favoritesList));
      const favoriteListIds = response.data.favoritesList.map(
        (favorite: TypeFavorite) => favorite.artistId
      );
      dispatch(setFavoriteListIds(favoriteListIds));
      navigate("/");
    } catch (err) {
      dispatch(setAuthentication(false));
      setError(true);
      if (!(axios.isAxiosError(err) && err.response?.status === 400)) {
        console.error(err);
      }
    }
  };
  return { error, setError, loginUser };
};

export default useLogin;
