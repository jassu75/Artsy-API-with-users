import Alert from "react-bootstrap/Alert";
import styles from "./accessDenied.module.css";
const AccessDenied = () => {
  return (
    <div className={styles.access_denied_container}>
      <Alert className={styles.access_denied}>
        Access denied. Please Register or Login to continue.
      </Alert>
    </div>
  );
};

export default AccessDenied;
