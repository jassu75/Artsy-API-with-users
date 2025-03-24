import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styles from "./homepage.module.css";
import TopBar from "./TopBar";
import useCheckAuth from "../hooks/useCheckAuth";

const Homepage = () => {
  const { authenticated, user, loading } = useCheckAuth();
  return !loading ? (
    <div>
      <div className={styles.homepage_container}>
        <TopBar authenticated={authenticated} user={user} />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  ) : null;
};

export default Homepage;
