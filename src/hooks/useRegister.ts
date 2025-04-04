import { useState } from "react";
import {
  TypeFavorite,
  TypeUserRegister,
} from "../UnauthorisedControls/unauthorizedControl.types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAuthentication,
  setFavoriteList,
  setFavoriteListIds,
  setUser,
} from "../redux/user.slice";

const useRegister = () => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = async (registerData: TypeUserRegister) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const axiosOptions = {
        headers: headers,
      };
      const url = "/api/db/register";
      setError(false);
      const response = await axios.post(url, registerData, axiosOptions);
      dispatch(setAuthentication(true));
      dispatch(setUser(response.data.user));
      dispatch(setFavoriteList(response.data.favoritesList));
      const favoriteListIds = response.data.favoritesList.map(
        (favorite: TypeFavorite) => favorite.artistId
      );
      dispatch(setFavoriteListIds(favoriteListIds));
      navigate("/");
    } catch (err) {
      setError(true);
      dispatch(setAuthentication(false));
      if (!(axios.isAxiosError(err) && err.response?.status === 400)) {
        console.error(err);
      }
    }
  };
  return { error, setError, registerUser };
};

export default useRegister;
