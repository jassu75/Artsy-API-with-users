import styles from "./favoritesIcon.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React from "react";
import {
  addFavoriteListIds,
  addNotification,
  removeFavoriteListIds,
} from "../redux/user.slice";
import useHandleFavorites from "../hooks/useHandleFavorites";

const FavortiesIcon = ({
  artistId,
  parent,
}: {
  artistId: string;
  parent: string;
}) => {
  const { addFavorite, deleteFavorite } = useHandleFavorites();
  const favoritesListIds = useSelector(
    (state: RootState) => state.userSlice.favoritesListIds
  );
  const authenticated = useSelector(
    (state: RootState) => state.userSlice.authenticated
  );
  const dispatch = useDispatch();

  const handleFavoriteIconClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (favoritesListIds?.includes(artistId)) {
      const notification = {
        id: Date.now(),
        message: "Removed from Favorites",
        type: "danger",
      };
      dispatch(addNotification(notification));
      dispatch(removeFavoriteListIds(artistId));
      deleteFavorite(artistId);
    } else {
      const notification = {
        id: Date.now(),
        message: "Added to Favorites",
        type: "success",
      };
      dispatch(addNotification(notification));
      dispatch(addFavoriteListIds(artistId));
      addFavorite(artistId);
    }
  };

  return authenticated ? (
    <button
      className={`${styles.favorites_button} ${
        parent == "artistInfo" ? styles.white_fill : styles.blue_fill
      } `}
      onClick={(event) => {
        handleFavoriteIconClick(event);
      }}
    >
      <img
        src={
          favoritesListIds?.includes(artistId)
            ? "/assets/filled_star.svg"
            : parent === "artistInfo"
            ? "/assets/black_unfilled_star.svg"
            : "/assets/unfilled_star.svg"
        }
        className={styles.favorites_image}
      />
    </button>
  ) : null;
};

export default FavortiesIcon;
