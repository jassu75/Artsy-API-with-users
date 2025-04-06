import Nav from "react-bootstrap/Nav";
import styles from "./artistDetails.module.css";
import ArtistInfo from "../ArtistInfo/ArtistInfo";
import Artworks from "../Artworks/Artworks";
import Spinner from "react-bootstrap/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetArtistDetails from "../../hooks/useGetArtistDetails";

const ArtistDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState<string>(
    queryParameters.get("activetab") || "artistInfo"
  );
  const [artistId, setArtistId] = useState<string | null>(
    queryParameters.get("artistid") || null
  );
  const { artworks, similarArtistList, artistInfo, loading } =
    useGetArtistDetails(artistId);

  const handleTabSelect = (eventKey: string | null) => {
    setActiveTab(eventKey || "artistInfo");
    queryParameters.set("activetab", eventKey || "artistInfo");
    const updatedUrl = `${location.pathname}?${queryParameters.toString()}`;
    navigate(updatedUrl, { replace: true });
  };

  useEffect(() => {
    setArtistId(queryParameters.get("artistid"));
  }, [location.search]);

  return artistId ? (
    <div className={styles.artist_content_container}>
      <Nav
        className={styles.tab_container}
        variant="tabs"
        activeKey={activeTab}
        onSelect={handleTabSelect}
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
      ) : (
        <>
          {artistInfo && activeTab === "artistInfo" && (
            <ArtistInfo
              similarArtistList={similarArtistList}
              artistInfo={artistInfo}
              artistId={artistId}
            />
          )}
          {artworks && activeTab === "artWorks" && (
            <Artworks artworks={artworks} />
          )}
        </>
      )}
    </div>
  ) : null;
};

export default ArtistDetails;
