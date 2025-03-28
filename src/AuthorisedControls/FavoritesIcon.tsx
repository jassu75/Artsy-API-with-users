import styles from "./favoritesIcon.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React from "react";
import { addFavoriteList, removeFavoriteList } from "../redux/user.slice";
import { addFavorite, deleteFavorite } from "../utils/handleFavorites";

const FavortiesIcon = ({
  artistId,
  parent,
}: {
  artistId: string;
  parent: string;
}) => {
  const favoritesList = useSelector(
    (state: RootState) => state.userSlice.favoritesList
  );
  const user = useSelector((state: RootState) => state.userSlice.user);
  const dispatch = useDispatch();

  const handleFavoriteIconClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (favoritesList?.includes(artistId)) {
      dispatch(removeFavoriteList(artistId));
      deleteFavorite(artistId);
    } else {
      dispatch(addFavoriteList(artistId));
      addFavorite(artistId);
    }
  };

  return user ? (
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
          favoritesList?.includes(artistId)
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
