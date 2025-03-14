import styles from "./homepage.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Register from "../UnauthorisedControls/Register";
import Login from "../UnauthorisedControls/Login";
import Search from "../UnauthorisedControls/Search";
import {
  TypeUnAuthorizedControlComponent,
  TypeUnAuthorizedControlKey,
} from "../UnauthorisedControls/unauthorizedControl.types";

const Homepage = () => {
  const [view, setView] = useState<TypeUnAuthorizedControlKey>("search");
  const viewComponent: TypeUnAuthorizedControlComponent = {
    register: <Register />,
    login: <Login />,
    search: <Search />,
  };

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
      {viewComponent[view]}
    </div>
  );
};

export default Homepage;
