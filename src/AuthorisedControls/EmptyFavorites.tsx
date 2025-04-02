import Alert from "react-bootstrap/Alert";
import styles from "./emptyFavorites.module.css";
const EmptyFavorites = () => {
  return (
    <div className={styles.empty_favorites_container}>
      <Alert className={styles.empty_favorites}>No favorite artists.</Alert>
    </div>
  );
};

export default EmptyFavorites;
