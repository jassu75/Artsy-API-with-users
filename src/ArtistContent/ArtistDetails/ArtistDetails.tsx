import Nav from "react-bootstrap/Nav";
import styles from "./artistDetails.module.css";
import ArtistInfo from "../ArtistInfo/ArtistInfo";
import Artworks from "../Artworks/Artworks";
import Spinner from "react-bootstrap/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import useGetArtistInfo from "../../hooks/useGetArtistInfo";
import useGetArtworks from "../../hooks/useGetArtworks";
import useGetSimilarArtists from "../../hooks/useGetSimilarArtists";
import SimilarArtistList from "../ArtistList/SimilarArtistList";
import { useEffect, useState } from "react";

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
  const { artistInfo, artistInfoLoading } = useGetArtistInfo(artistId);
  const { artworks, artworksLoading } = useGetArtworks(artistId);
  const { similarArtistList, similarArtistLoading } =
    useGetSimilarArtists(artistId);

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

      {artistInfoLoading || artworksLoading || similarArtistLoading ? (
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
            <ArtistInfo artistInfo={artistInfo} />
          )}
          {artworks && activeTab === "artWorks" && (
            <Artworks artworks={artworks} />
          )}
          {similarArtistList && (
            <SimilarArtistList artistList={similarArtistList} />
          )}
        </>
      )}
    </div>
  ) : null;
};

export default ArtistDetails;
