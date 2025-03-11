import styles from "./homepage.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";

const Homepage = () => {
  const [view, setView] = useState("search");

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className={styles.homepage_navbar}>
        <Navbar.Brand>Artist Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => setView("search")}
              className={`${styles.navbar_button} ${
                view == "search" ? styles.active : ""
              }`}
            >
              Search
            </Nav.Link>
            <Nav.Link
              onClick={() => setView("login")}
              className={`${styles.navbar_button} ${
                view == "login" ? styles.active : ""
              }`}
            >
              Log in
            </Nav.Link>
            <Nav.Link
              onClick={() => setView("register")}
              className={`${styles.navbar_button} ${
                view == "register" ? styles.active : ""
              }`}
            >
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Homepage;
