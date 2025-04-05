import Alert from "react-bootstrap/Alert";
import styles from "./emptySimilarArtistList.module.css";

const EmptySimilarArtistList = () => {
  return (
    <Alert className={styles.empty_artistlist_container}>
      No Similar Artists.
    </Alert>
  );
};

export default EmptySimilarArtistList;
