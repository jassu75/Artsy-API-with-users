import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styles from "./homepage.module.css";
import TopBar from "./TopBar";

const Homepage = () => {
  return (
    <div>
      <div className={styles.homepage_container}>
        <TopBar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
