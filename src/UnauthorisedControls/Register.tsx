import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import styles from "./register.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const [isValidFullname, setIsValidFullname] = useState<boolean>(false);
  const [showFullnameError, setShowFullNameError] = useState<boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);

  const { error, setError, registerUser } = useRegister();

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowFullNameError(true);
    const isValidInput = event.target.value.trim() !== "";
    setIsValidFullname(isValidInput);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowEmailError(true);
    setError(false);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidInput = emailPattern.test(event.target.value.trim());
    setIsValidEmail(isValidInput);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPasswordError(true);
    const isValidInput = event.target.value.trim() !== "";
    setIsValidPassword(isValidInput);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowFullNameError(true);
    setShowEmailError(true);
    setShowPasswordError(true);

    const form = event.currentTarget;

    if (isValidFullname && isValidEmail && isValidPassword) {
      const formData = new FormData(form);
      const registerData = {
        fullname: formData.get("fullname") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      await registerUser(registerData);
    }
  };

  return (
    <Container className={styles.form_container}>
      <Form className={styles.form} noValidate onSubmit={handleSubmit}>
        <h3 className={styles.form_heading}>Register</h3>

        <Form.Group controlId="FullName">
          <Form.Label className={styles.form_label}>Fullname</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="John Doe"
            className={styles.form_input_field}
            autoComplete="name"
            name="fullname"
            onChange={handleFullnameChange}
            isInvalid={!isValidFullname && showFullnameError}
            isValid={isValidFullname && showFullnameError}
          />
          <Form.Control.Feedback type="invalid">
            Fullname is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label className={styles.form_label}>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            className={styles.form_input_field}
            autoComplete="email"
            name="email"
            onChange={handleEmailChange}
            isInvalid={(!isValidEmail || error) && showEmailError}
            isValid={(isValidEmail || !error) && showEmailError}
          />
          <Form.Control.Feedback type="invalid">
            {error ? "Email already exists" : "Email must be valid"}
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
            isInvalid={!isValidPassword && showPasswordError}
            isValid={isValidPassword && showPasswordError}
          />
          <Form.Control.Feedback type="invalid">
            Password is required
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid pt-4">
          <Button
            variant="secondary"
            type="submit"
            size="sm"
            disabled={!(isValidFullname && isValidEmail && isValidPassword)}
          >
            Register
          </Button>
        </div>
      </Form>
      <p className={styles.redirect_text}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Container>
  );
};

export default Register;
