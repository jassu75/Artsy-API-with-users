import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { TypeArtworks } from "../../UnauthorisedControls/unauthorizedControl.types";
import styles from "./artworkCateogiresModal.module.css";
import useGetCategory from "../../hooks/useGetCategory";
import ArtworkCategories from "./ArtworkCategories";

const ArtworkCategoriesModal = ({
  artworkDetails,
  open,
  handleClose,
}: {
  open: boolean;
  artworkDetails: TypeArtworks;
  handleClose: () => void;
}) => {
  const { category, loading } = useGetCategory(artworkDetails.id);
  return (
    <Modal show={open} onHide={handleClose} size="lg" top>
      <Modal.Header closeButton>
        <div className={styles.header_comtainer}>
          <Card className={styles.arwork_info_container}>
            <img
              className={styles.artowrk_info_image}
              src={artworkDetails?.image}
            />
            <div className={styles.artowrk_info_contnet}>
              <Card.Text>
                {artworkDetails?.title}
                <br /> {artworkDetails?.date}
              </Card.Text>
            </div>
          </Card>
        </div>
      </Modal.Header>
      <Modal.Body>
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
        {!loading && category ? (
          <ArtworkCategories category={category} />
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default ArtworkCategoriesModal;
