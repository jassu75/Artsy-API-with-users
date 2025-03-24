import styles from "./topBar.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { logout } from "../utils/handleAccount";
import { TypeUser } from "../UnauthorisedControls/unauthorizedControl.types";
import { Link, useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const TopBar = ({
  authenticated,
  user,
}: {
  authenticated: boolean;
  user: TypeUser | null;
}) => {
  const location = useLocation();
  const activePath = location.pathname.split("/").filter(Boolean)[0];
  const [view, setView] = useState<string>(activePath || "search");

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
            } px-3 mr-1`}
          >
            Search
          </Nav.Link>
          {authenticated ? (
            <Nav.Link
              as={Link}
              to="/favorites"
              onClick={() => setView("favorites")}
              className={`${styles.navbar_button} ${
                view == "favorites" ? styles.active : ""
              } px-3 mr-1`}
            >
              Favorites
            </Nav.Link>
          ) : (
            <Nav.Link
              as={Link}
              to="/login"
              onClick={() => setView("login")}
              className={`${styles.navbar_button} ${
                view == "login" ? styles.active : ""
              } px-3 mr-1`}
            >
              Log in
            </Nav.Link>
          )}
          {authenticated ? (
            <NavDropdown
              title={user?.fullname}
              className={`${styles.navbar_button} px-3 mr-1`}
            >
              <NavDropdown.Item className={styles.delete_acct_item}>
                Delete account
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout} className={styles.logout_item}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link
              as={Link}
              to="/register"
              onClick={() => setView("register")}
              className={`${styles.navbar_button} ${
                view === "register" ? styles.active : ""
              } px-3 mr-1`}
            >
              Register
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
