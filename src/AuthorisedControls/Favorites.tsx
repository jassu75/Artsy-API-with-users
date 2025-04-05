import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Card from "react-bootstrap/Card";
import CardImgOverlay from "react-bootstrap/CardImgOverlay";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import styles from "./favorites.module.css";
import EmptyFavorites from "./EmptyFavorites";
import useHandleFavorites from "../hooks/useHandleFavorites";
import { addNotification, removeFavoriteListIds } from "../redux/user.slice";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";
import AccessDenied from "../UnauthorisedControls/AccessDenied";
import useRetrieveFavorites from "../hooks/useRetrieveFavorites";

const Favorites = () => {
  const favoritesList = useSelector(
    (state: RootState) => state.userSlice.favoritesList
  );
  const { deleteFavorite } = useHandleFavorites();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useRetrieveFavorites();

  const handleRemoveClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    artistId: string
  ) => {
    event.stopPropagation();
    const notification = {
      id: Date.now(),
      message: "Removed from Favorites",
      type: "danger",
    };
    dispatch(addNotification(notification));
    dispatch(removeFavoriteListIds(artistId));
    deleteFavorite(artistId);
  };

  const handleCardClick = (artistId: string) => {
    const url = `/?artistid=${artistId}&activetab=artistInfo`;
    navigate(url);
  };

  if (loading) {
    return (
      <div className={styles.loading_container}>
        <Spinner
          role="status"
          aria-hidden="true"
          animation="border"
          variant="secondary"
        />
      </div>
    );
  }

  if (!favoritesList) {
    return <AccessDenied />;
  }

  return favoritesList.length > 0 ? (
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
