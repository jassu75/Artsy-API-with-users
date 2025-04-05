import { useDispatch, useSelector } from "react-redux";
import { setFavoriteList, setFavoriteListIds } from "../redux/user.slice";
import { TypeFavorite } from "../UnauthorisedControls/unauthorizedControl.types";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";

const useRetrieveFavorites = () => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const favoritesList = useSelector(
    (state: RootState) => state.userSlice.favoritesList
  );
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const retrieveFavorites = async () => {
      if (!favoritesList && user?.email) {
        try {
          setLoading(true);
          const url = `/api/retrievefavoritelist/${user.email}`;
          const headers = {
            "Content-Type": "application/json",
          };
          const axiosOptions = {
            headers: headers,
          };
          const response = await axios(url, axiosOptions);
          if (response.data) {
            dispatch(setFavoriteList(response.data));
            const favoriteListIds = response.data.map(
              (favorite: TypeFavorite) => favorite.artistId
            );
            dispatch(setFavoriteListIds(favoriteListIds));
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    retrieveFavorites();
  }, [dispatch, user?.email, favoritesList]);

  return { loading };
};

export default useRetrieveFavorites;
