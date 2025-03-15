import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import { TypeArtworks } from "../../UnauthorisedControls/unauthorizedControl.types";
import styles from "./artworks.module.css";
import Button from "react-bootstrap/Button";

const Artworks = ({ artworks }: { artworks: TypeArtworks[] }) => {
  return (
    <Row xs={1} md={2} lg={4} className="g-3 pt-4  ">
      {artworks.map((artworkInfo) => (
        <Col key={artworkInfo.id}>
          <Card key={artworkInfo.id} className={styles.artwork_card}>
            <Card.Img src={artworkInfo.image} variant="top" />
            <Card.Body className={styles.artwork_body}>
              <Card.Text className={styles.artwork_title}>
                {artworkInfo.title}, {artworkInfo.date}
              </Card.Text>
            </Card.Body>
            <Button className={styles.view_categories_button}>
              View Categories
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Artworks;
