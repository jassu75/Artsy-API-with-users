import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import styles from "./login.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  const { error, setError, loginUser } = useLogin();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowEmailError(true);
    setError(false);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidInput = emailPattern.test(event.target.value.trim());
    setIsValidEmail(isValidInput);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setShowPasswordError(true);
    const isValidInput = event.target.value.trim() !== "";
    setIsValidPassword(isValidInput);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowEmailError(true);
    setShowPasswordError(true);

    const form = event.currentTarget;

    if (isValidEmail && isValidPassword) {
      const formData = new FormData(form);
      const loginData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      await loginUser(loginData);
    }
  };

  return (
    <Container className={styles.form_container}>
      <Form className={styles.form} noValidate onSubmit={handleSubmit}>
        <h3 className={styles.form_heading}>Login</h3>
        <Form.Group controlId="Email">
          <Form.Label className={styles.form_label}>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            className={styles.form_input_field}
            autoComplete="email"
            name="email"
            onChange={handleEmailChange}
            isInvalid={!isValidEmail && showEmailError}
            isValid={isValidEmail && showEmailError}
          />
          <Form.Control.Feedback type="invalid">
            Email must be valid
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label className={styles.form_label}>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            className={styles.form_input_field}
            autoComplete="password"
            name="password"
            onChange={handlePasswordChange}
            isInvalid={(!isValidPassword || error) && showPasswordError}
            isValid={(isValidPassword || !error) && showPasswordError}
          />
          <Form.Control.Feedback type="invalid">
            {error ? "Password or email is incorrect" : "Password is required"}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid pt-4">
          <Button
            className={`${styles.login_button} ${
              !(isValidEmail && isValidPassword) ? styles.disabled_button : ""
            }`}
            type="submit"
            size="sm"
            disabled={!(isValidEmail && isValidPassword)}
          >
            Login
          </Button>
        </div>
      </Form>
      <p className={styles.redirect_text}>
        Dont have an account yet? <Link to="/register">Register</Link>{" "}
      </p>
    </Container>
  );
};

export default Login;
