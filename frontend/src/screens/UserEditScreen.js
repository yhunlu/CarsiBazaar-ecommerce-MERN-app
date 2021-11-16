import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../store/userDetails";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.entities.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user._id, user.name, user.email, user.isAdmin]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link
        to="/admin/userlist"
        className="btn btn-md btn-outline-warning my-3"
      >
        Geri Git
      </Link>
      <FormContainer className="login">
        <h1 id="userEditScreenHeader">ÜYE BİLGİSİ DÜZENLEME</h1>
        {loading ? (
          <Loader />
        ) : error.length > 0 ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className="d-grid gap-4">
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

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="ADMIN"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button
              type="submit"
              className="btn btn-md btn-outline-warning"
              variant="light"
            >
              KAYDET
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
