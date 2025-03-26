import { Card } from "react-bootstrap";
import { TypeArtistListDetails } from "../../UnauthorisedControls/unauthorizedControl.types";
import EmptySimilarArtistList from "./EmptySimilarArtistList";
import styles from "./similarArtistList.module.css";
import { useLocation, useNavigate } from "react-router-dom";

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
      <div className={styles.artist_list}>
        {artistList ? (
          artistList?.length !== 0 ? (
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
                <Card.Body className={`${styles.card_body} `}>
                  <Card.Title className={styles.card_title}>
                    {artistDetails.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            ))
          ) : (
            <EmptySimilarArtistList />
          )
        ) : null}
      </div>
    </div>
  );
};

export default SimilarArtistList;
