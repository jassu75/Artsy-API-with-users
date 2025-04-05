import { Card } from "react-bootstrap";
import { TypeArtistListDetails } from "../../UnauthorisedControls/unauthorizedControl.types";
import styles from "./similarArtistList.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import FavortiesIcon from "../../AuthorisedControls/FavoritesIcon";
import EmptySimilarArtistList from "./EmptySimilarArtistlist";

const SimilarArtistList = ({
  artistList,
}: {
  artistList: TypeArtistListDetails[];
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);

  const handleCardClick = (artistId: string) => {
    queryParameters.set("artistid", artistId);
    queryParameters.set("activetab", "artistInfo");
    const updatedUrl = `${location.pathname}?${queryParameters.toString()}`;
    navigate(updatedUrl, { replace: true });
  };

  return (
    <div className={styles.artists_list_container}>
      <h4 className={styles.similar_artists_heading}>Similar Artists</h4>
      <div className={styles.artist_list}>
        {artistList.length > 0 ? (
          artistList.map((artistDetails) => (
            <Card
              key={artistDetails.id}
              className={styles.artist_card}
              onClick={() => handleCardClick(artistDetails.id)}
            >
              <Card.Img
                src={artistDetails.image}
                variant="top"
                className={styles.card_image}
              />

              <Card.ImgOverlay className={styles.image_overlay}>
                <FavortiesIcon
                  parent={`similarArtistList`}
                  artistId={artistDetails.id}
                />
              </Card.ImgOverlay>
              <Card.Body className={styles.card_body}>
                <Card.Title className={styles.card_title}>
                  {artistDetails.title}
                </Card.Title>
              </Card.Body>
            </Card>
          ))
        ) : (
          <EmptySimilarArtistList />
        )}
      </div>
    </div>
  );
};

export default SimilarArtistList;
