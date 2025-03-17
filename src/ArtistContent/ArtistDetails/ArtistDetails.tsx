import Nav from "react-bootstrap/Nav";
import styles from "./artistDetails.module.css";
import { useState } from "react";
import {
  TypeArtistInfo,
  TypeArtworks,
} from "../../UnauthorisedControls/unauthorizedControl.types";
import ArtistInfo from "../ArtistInfo/ArtistInfo";
import Artworks from "../Artworks/Artworks";
import Spinner from "react-bootstrap/Spinner";

const ArtistDetails = ({
  artistInfo,
  loading,
  artworks,
}: {
  artistInfo: TypeArtistInfo | null;
  loading: boolean;
  artworks: TypeArtworks[] | null;
}) => {
  const [activeTab, setActiveTab] = useState<string>("artistInfo");

  return (
    <div className={styles.artist_content_container}>
      <Nav
        className={styles.tab_container}
        variant="tabs"
        activeKey={activeTab}
        onSelect={(eventKey) => setActiveTab(eventKey || "artistInfo")}
        justify
      >
        <Nav.Item>
          <Nav.Link
            eventKey="artistInfo"
            className={`${styles.tab} ${
              activeTab === "artistInfo" ? styles.active : ""
            }`}
          >
            Artist Info
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="artWorks"
            className={`${styles.tab} ${
              activeTab === "artWorks" ? styles.active : ""
            }`}
          >
            ArtWorks
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {loading ? (
        <div className={styles.loading_container}>
          <Spinner
            role="status"
            aria-hidden="true"
            animation="border"
            variant="secondary"
          />
        </div>
      ) : null}
      {artistInfo && !loading && activeTab === "artistInfo" ? (
        <ArtistInfo artistInfo={artistInfo} />
      ) : artworks && !loading && activeTab === "artWorks" ? (
        <Artworks artworks={artworks} />
      ) : null}
    </div>
  );
};

export default ArtistDetails;
