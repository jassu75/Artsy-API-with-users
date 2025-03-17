import Alert from "react-bootstrap/Alert";
import styles from "./emptyCategory.module.css";
const EmptyCategory = () => {
  return <Alert className={styles.empty_category}>No categories.</Alert>;
};

export default EmptyCategory;
