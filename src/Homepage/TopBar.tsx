import styles from "./topBar.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";

import { TypeUnAuthorizedControlKey } from "../UnauthorisedControls/unauthorizedControl.types";
import { Link } from "react-router-dom";

const TopBar = () => {
  const [view, setView] = useState<TypeUnAuthorizedControlKey>("search");

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbar}>
      <Navbar.Brand>Artist Search</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            as={Link}
            to="/"
            onClick={() => setView("search")}
            className={`${styles.navbar_button} ${
              view == "search" ? styles.active : ""
            }`}
          >
            Search
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/login"
            onClick={() => setView("login")}
            className={`${styles.navbar_button} ${
              view == "login" ? styles.active : ""
            }`}
          >
            Log in
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/register"
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
  );
};

export default TopBar;
