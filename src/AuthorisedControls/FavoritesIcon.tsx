import { Button } from "react-bootstrap";
import styles from "./favoritesIcon.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React, { useEffect, useState } from "react";
import { addFavoriteList, removeFavoriteList } from "../redux/user.slice";
import { addFavorite, deleteFavorite } from "../utils/handleFavorites";

const FavortiesIcon = ({ artistId }: { artistId: string }) => {
  const favoritesList = useSelector(
    (state: RootState) => state.userSlice.favoritesList
  );
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [userFavorite, setUserFavorite] = useState<boolean>(
    favoritesList?.includes(artistId) ?? false
  );
  const dispatch = useDispatch();

  const handleFavoriteIconClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setUserFavorite(!userFavorite);
  };

  useEffect(() => {
    if (userFavorite) {
      dispatch(addFavoriteList(artistId));
      addFavorite(artistId);
    } else {
      dispatch(removeFavoriteList(artistId));
      deleteFavorite(artistId);
    }
  }, [userFavorite, artistId, dispatch]);

  return user ? (
    <Button
      className={styles.favorites_button}
      onClick={(event) => {
        handleFavoriteIconClick(event);
      }}
    >
      <img
        src={
          userFavorite ? "/assets/filled_star.svg" : "/assets/unfilled_star.svg"
        }
        className={styles.favorites_image}
      />
    </Button>
  ) : null;
};

export default FavortiesIcon;
