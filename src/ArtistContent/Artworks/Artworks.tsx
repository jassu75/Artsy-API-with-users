import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import { TypeArtworks } from "../../UnauthorisedControls/unauthorizedControl.types";
import styles from "./artworks.module.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import ArtworkCategoriesModal from "../ArtworkCategories/ArtworkCategoriesModal";
import EmptyArtworks from "./EmptyArtworks";

const Artworks = ({ artworks }: { artworks: TypeArtworks[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [artworkDetails, setArtworkDetails] = useState<TypeArtworks | null>(
    null
  );
  const handleViewCategoriesClick = (artworkInfo: TypeArtworks) => {
    setOpen(true);
    setArtworkDetails(artworkInfo);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (artworks.length === 0) {
    return (
      <div className={styles.empty_arworks_container}>
        <EmptyArtworks />
      </div>
    );
  }
  return (
    <div>
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
              <Button
                className={styles.view_categories_button}
                onClick={() => {
                  handleViewCategoriesClick(artworkInfo);
                }}
              >
                View Categories
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      {artworkDetails ? (
        <ArtworkCategoriesModal
          artworkDetails={artworkDetails}
          open={open}
          handleClose={handleClose}
        />
      ) : null}
    </div>
  );
};

export default Artworks;
