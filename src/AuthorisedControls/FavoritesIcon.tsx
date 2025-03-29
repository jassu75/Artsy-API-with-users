import styles from "./favoritesIcon.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React from "react";
import { addFavoriteListIds, removeFavoriteListIds } from "../redux/user.slice";
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
  const user = useSelector((state: RootState) => state.userSlice.user);
  const dispatch = useDispatch();

  const handleFavoriteIconClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (favoritesListIds?.includes(artistId)) {
      dispatch(removeFavoriteListIds(artistId));
      deleteFavorite(artistId);
    } else {
      dispatch(addFavoriteListIds(artistId));
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
