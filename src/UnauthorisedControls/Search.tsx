import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./search.module.css";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import useGetArtistList from "../hooks/useGetArtistList";
import { useState } from "react";
import ArtistList from "../ArtistContent/ArtistList/ArtistList";
import { useNavigate } from "react-router-dom";
import useRetrieveFavorites from "../hooks/useRetrieveFavorites";

const Search = () => {
  const [artistName, setArtistName] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loading: retrieveFavoritesLoader } = useRetrieveFavorites();
  const { artistList, loading, fetchArtistList, setArtistList } =
    useGetArtistList();

  const handleSearch = () => {
    fetchArtistList(artistName);
  };

  const handleClear = () => {
    setArtistList(null);
    setArtistName(null);
    navigate("/");
  };

  const handleEnterPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return !retrieveFavoritesLoader ? (
    <Container className={styles.search_container}>
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Please enter an artist name"
          size="sm"
          value={artistName || ""}
          onChange={(e) => setArtistName(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <Button
          onClick={handleSearch}
          className={styles.search_button}
          size="sm"
          disabled={!artistName}
        >
          Search
          {loading ? (
            <Spinner
              animation="border"
              variant="light"
              size="sm"
              className="ms-2 pt-2"
              as="span"
              role="status"
              aria-hidden="true"
            />
          ) : null}
        </Button>
        <Button className={styles.clear_button} size="sm" onClick={handleClear}>
          Clear
        </Button>
      </InputGroup>

      <ArtistList artistList={artistList} />
    </Container>
  ) : null;
};

export default Search;
