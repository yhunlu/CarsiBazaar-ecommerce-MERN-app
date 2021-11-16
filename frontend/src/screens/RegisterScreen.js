import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../store/users";
import FormContainer from "../components/FormContainer";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.entities.users);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPATCH LOGIN
    if (password !== confirmPassword) {
      setMessage("Şifreler Aynı Değil !");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer className="login">
      <h1>Üye Ol</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="d-grid gap-2">
        <Form.Group controlId="name">
          <Form.Label>İsim</Form.Label>
          <Form.Control
            type="name"
            placeholder="İsmini Yaz"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Adresini Yaz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Şifre</Form.Label>
          <Form.Control
            type="password"
            placeholder="Şifreni Yaz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Tekrar Şifre</Form.Label>
          <Form.Control
            type="password"
            placeholder="Tekrar Şifreni Yaz"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          className="btn btn-md btn-outline-info"
          variant="light"
        >
          Üye Ol
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Zaten Üye misin ?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            style={{ color: "green" }}
          >
            Giriş Yap
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
