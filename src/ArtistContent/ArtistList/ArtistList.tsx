import Card from "react-bootstrap/Card";
import styles from "./artistList.module.css";
import { TypeArtistListDetails } from "../../UnauthorisedControls/unauthorizedControl.types";
import EmptyArtistList from "./EmptyArtistList";
import ArtistDetails from "../ArtistDetails/ArtistDetails";
import { useState } from "react";
import useGetArtistInfo from "../../hooks/useGetArtistInfo";

const ArtistList = ({
  artistList,
}: {
  artistList: TypeArtistListDetails[];
}) => {
  const [activeArtistCardId, setActiveArtistCardId] = useState<string | null>(
    null
  );
  const { artistInfo, loading, fetchArtistInfo } = useGetArtistInfo();
  const handleCardClick = (artistId: string) => {
    setActiveArtistCardId(artistId);
    fetchArtistInfo(artistId);
  };
  return (
    <div className={styles.artists_list_container}>
      <div className={styles.artist_list}>
        {artistList?.length !== 0 ? (
          artistList.map((artistDetails) => (
            <Card
              key={artistDetails.id}
              className={styles.artist_card}
              onClick={() => handleCardClick(artistDetails.id)}
            >
              <Card.Img src={artistDetails.image} variant="top" />
              <Card.Body
                className={`${styles.card_body} ${
                  artistDetails.id == activeArtistCardId ? styles.active : ""
                }`}
              >
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
      {artistInfo ? (
        <ArtistDetails loading={loading} artistInfo={artistInfo} />
      ) : null}
    </div>
  );
};

export default ArtistList;
