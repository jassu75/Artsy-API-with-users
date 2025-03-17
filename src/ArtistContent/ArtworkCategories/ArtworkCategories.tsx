import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { TypeCategory } from "../../UnauthorisedControls/unauthorizedControl.types";
import styles from "./artworkCategories.module.css";
import EmptyCategory from "./EmptyCategory";

const ArtworkCategories = ({ category }: { category: TypeCategory[] }) => {
  if (category.length === 0) {
    return (
      <div className={styles.empty_category_container}>
        <EmptyCategory />
      </div>
    );
  }

  return (
    <div>
      <Row xs={1} md={2} lg={4} className="g-3 ">
        {category.map((categoryDetails) => (
          <Col key={categoryDetails.id}>
            <Card key={categoryDetails.id} className={styles.category_card}>
              <Card.Img
                src={categoryDetails.image}
                variant="top"
                className={styles.category_image}
              />
              <Card.Body className={styles.category_body}>
                <Card.Text className={styles.category_text}>
                  {categoryDetails.title}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ArtworkCategories;
