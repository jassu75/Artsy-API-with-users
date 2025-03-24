import Card from "react-bootstrap/Card";
import styles from "./artistList.module.css";
import { TypeArtistListDetails } from "../../UnauthorisedControls/unauthorizedControl.types";
import EmptyArtistList from "./EmptyArtistList";
import ArtistDetails from "../ArtistDetails/ArtistDetails";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [activeTab, setActiveTab] = useState<string>(
    queryParameters.get("activetab") || "artistInfo"
  );

  const handleCardClick = (artistId: string) => {
    queryParameters.set("artistid", artistId);
    queryParameters.set("activetab", "artistInfo");
    const updatedUrl = `${location.pathname}?${queryParameters.toString()}`;
    navigate(updatedUrl, { replace: true });
    setActiveArtistCardId(artistId);
    setActiveTab("artistInfo");
  };

  useEffect(() => {
    if (artistList) {
      setActiveArtistCardId(null);
    }
  }, [artistList]);

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
                <Card.Img src={artistDetails.image} variant="top" />
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
      {activeArtistCardId ? (
        <ArtistDetails
          artistId={activeArtistCardId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ) : null}
    </div>
  );
};

export default ArtistList;
