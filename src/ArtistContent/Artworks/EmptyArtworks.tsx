import Alert from "react-bootstrap/Alert";
import styles from "./emptyArtworks.module.css";
const EmptyArtworks = () => {
  return <Alert className={styles.empty_artworks}>No artworks.</Alert>;
};

export default EmptyArtworks;
