import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import styles from "./register.module.css";
import { Button } from "react-bootstrap";

const Register = () => {
  const [isValid, setisValid] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setisValid(true);
  };

  return (
    <Container className={styles.form_container}>
      <Form
        className={styles.form}
        noValidate
        validated={isValid}
        onSubmit={handleSubmit}
      >
        <h3 className={styles.form_heading}>Register</h3>
        <Form.Group controlId="FullName">
          <Form.Label className={styles.form_label}>Fullname</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="John Doe"
            className={styles.form_input_field}
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
          />
          <Form.Control.Feedback type="invalid">
            Password is required
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid pt-4">
          <Button variant="secondary" type="submit" size="sm">
            Register
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
