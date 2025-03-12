import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./search.module.css";
import { Container } from "react-bootstrap";

const Search = () => {
  return (
    <Container className={styles.search_container}>
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Please enter an artist name"
          size="sm"
        />
        <Button className={styles.search_button} size="sm">
          Search
        </Button>
        <Button className={styles.clear_button} size="sm">
          Clear
        </Button>
      </InputGroup>
    </Container>
  );
};

export default Search;
