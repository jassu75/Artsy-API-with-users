import Card from "react-bootstrap/Card";
import styles from "./artistList.module.css";
import { TypeArtistListDetails } from "../../UnauthorisedControls/unauthorizedControl.types";
import EmptyArtistList from "./EmptyArtistList";
import ArtistDetails from "../ArtistDetails/ArtistDetails";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavortiesIcon from "../../AuthorisedControls/FavoritesIcon";

const ArtistList = ({
  artistList,
}: {
  artistList: TypeArtistListDetails[] | null;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const [activeArtistCardId, setActiveArtistCardId] = useState<string | null>(
    queryParameters.get("artistid")
  );

  const handleCardClick = (artistId: string) => {
    queryParameters.set("artistid", artistId);
    queryParameters.set("activetab", "artistInfo");
    const updatedUrl = `${location.pathname}?${queryParameters.toString()}`;
    navigate(updatedUrl, { replace: true });
    setActiveArtistCardId(artistId);
  };

  useEffect(() => {
    if (artistList) {
      setActiveArtistCardId(null);
      navigate("/");
    }
  }, [artistList, navigate]);

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
                <Card.ImgOverlay className={styles.image_overlay}>
                  <FavortiesIcon artistId={artistDetails.id} />
                </Card.ImgOverlay>

                <Card.Body
                  className={`${styles.card_body} ${
                    artistDetails.id === activeArtistCardId ? styles.active : ""
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
          )
        ) : null}
      </div>
      <ArtistDetails />
    </div>
  );
};

export default ArtistList;
