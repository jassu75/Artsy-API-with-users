import Card from "react-bootstrap/Card";
import styles from "./artistList.module.css";
import { ArtistListDetails } from "../../UnauthorisedControls/unauthorizedControl.types";
import EmptyArtistList from "./EmptyArtistList";

const ArtistList = ({ artistList }: { artistList: ArtistListDetails[] }) => {
  return (
    <div className={styles.artists_list_container}>
      <div className={styles.artist_list}>
        {artistList?.length !== 0 ? (
          artistList.map((artistDetails) => (
            <Card key={artistDetails.id} className={styles.artist_card}>
              <Card.Img src={artistDetails.image} variant="top" />
              <Card.Body className={styles.card_body}>
                <Card.Title className={styles.card_title}>
                  {artistDetails.title}
                </Card.Title>
              </Card.Body>
            </Card>
          ))
        ) : (
          <EmptyArtistList />
        )}
      </div>
    </div>
  );
};

export default ArtistList;
