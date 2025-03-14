import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./search.module.css";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import useGetArtistList from "../hooks/useGetArtistList";
import { useState } from "react";
import ArtistList from "../ArtistContent/ArtistList/ArtistList";

const Search = () => {
  const [artistName, setArtistName] = useState<string | null>(null);
  const { artistList, loading, fetchArtistList } = useGetArtistList();

  const handleSearch = () => {
    fetchArtistList(artistName);
  };

  return (
    <Container className={styles.search_container}>
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Please enter an artist name"
          size="sm"
          onChange={(e) => setArtistName(e.target.value)}
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
        <Button className={styles.clear_button} size="sm">
          Clear
        </Button>
      </InputGroup>

      {Array.isArray(artistList) ? (
        <ArtistList artistList={artistList} />
      ) : null}
    </Container>
  );
};

export default Search;
