import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Card, CardImgOverlay, Col, Image, Row } from "react-bootstrap";
import styles from "./favorites.module.css";
import EmptyFavorites from "./EmptyFavorites";
import useHandleFavorites from "../hooks/useHandleFavorites";
import { removeFavoriteListIds } from "../redux/user.slice";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

const Favorites = () => {
  const favoritesList = useSelector(
    (state: RootState) => state.userSlice.favoritesList
  );
  const { deleteFavorite } = useHandleFavorites();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    artistId: string
  ) => {
    event.stopPropagation();
    dispatch(removeFavoriteListIds(artistId));
    deleteFavorite(artistId);
  };

  const handleCardClick = (artistId: string) => {
    const url = `/?artistid=${artistId}&activetab=artistInfo`;
    navigate(url);
  };

  return favoritesList && favoritesList.length > 0 ? (
    <div className={styles.favorites_container}>
      <Row xs={1} md={2} lg={3} className={` g-3 ${styles.favorite_list} `}>
        {favoritesList.map((favoriteDetails) => (
          <Col key={favoriteDetails.artistId}>
            <Card
              key={favoriteDetails.artistId}
              className={styles.favorites_card}
              onClick={() => {
                handleCardClick(favoriteDetails.artistId);
              }}
            >
              <Image
                className={styles.favorites_image}
                src={favoriteDetails.image}
              />
              <CardImgOverlay className={styles.card_overlay}>
                <span className={styles.artist_name_text}>
                  {favoriteDetails.artistName}
                </span>
                <span className={styles.artist_dates_text}>
                  {favoriteDetails.birthDay} - {favoriteDetails.deathDay}
                </span>
                <p className={styles.artist_nationality_text}>
                  {favoriteDetails.nationality}
                </p>
                <div className={styles.interactive_container}>
                  <Timer createdAt={favoriteDetails.createdAt} />
                  <button
                    onClick={(event) => {
                      handleRemoveClick(event, favoriteDetails.artistId);
                    }}
                    className={styles.remove_text}
                  >
                    Remove
                  </button>
                </div>
              </CardImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  ) : (
    <EmptyFavorites />
  );
};

export default Favorites;
