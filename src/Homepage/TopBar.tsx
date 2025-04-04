import styles from "./topBar.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useHandleAccount from "../hooks/useHandleAccount";

const TopBar = () => {
  const location = useLocation();
  const [view, setView] = useState<string>(
    location.pathname.split("/").filter(Boolean)[0] || "search"
  );
  const authenticated = useSelector(
    (state: RootState) => state.userSlice.authenticated
  );
  const { logout, deleteAccount } = useHandleAccount();

  useEffect(() => {
    if (location.pathname) {
      setView(location.pathname.split("/").filter(Boolean)[0] || "search");
    }
  }, [location.pathname]);

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navbar}>
      <Navbar.Brand>Artist Search</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            as={Link}
            to="/"
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
              className={`${styles.navbar_button} ${
                view == "login" ? styles.active : ""
              } px-3 mr-1`}
            >
              Log in
            </Nav.Link>
          )}
          {authenticated ? (
            <NavDropdown
              title={<Profile />}
              className={`${styles.navbar_button} px-3 mr-1`}
            >
              <NavDropdown.Item
                className={styles.delete_acct_item}
                onClick={() => {
                  deleteAccount();
                }}
              >
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
