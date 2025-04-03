import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styles from "./homepage.module.css";
import TopBar from "./TopBar";
import useCheckAuth from "../hooks/useCheckAuth";
import Notification from "../AuthorisedControls/Notification";

const Homepage = () => {
  const { authenticated, loading } = useCheckAuth();
  return !loading ? (
    <div>
      <div className={styles.homepage_container}>
        <TopBar authenticated={authenticated} />
        <main>
          <Outlet />
          <Notification />
        </main>
      </div>
      <Footer />
    </div>
  ) : null;
};

export default Homepage;
