import Alert from "react-bootstrap/Alert";
import styles from "./emptyArtistList.module.css";
const EmptyArtistList = () => {
  return (
    <Alert className={styles.empty_artistlist_container}>No Results.</Alert>
  );
};

export default EmptyArtistList;
