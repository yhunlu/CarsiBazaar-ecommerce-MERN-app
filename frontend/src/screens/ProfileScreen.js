import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../store/userDetails";
import { getMyOrderList } from "./../store/myOrderList";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.entities.userDetails);
  const { loading, error, user, success } = userDetails;

  const userLogin = useSelector((state) => state.entities.users);
  const { userInfo } = userLogin;

  const myOrderList = useSelector((state) => state.entities.myOrderList);
  const {
    orders: myOrders,
    loading: loadingMyOrders,
    error: errorMyOrders,
  } = myOrderList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getMyOrderList());
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPATCH LOGIN
    if (password !== confirmPassword) {
      setMessage("Şifreler Aynı Değil !");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Kullanıcı Bilgilerim</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success > 0 && <Message variant="success">Güncellendi</Message>}
        {error.length > 0 && <Message variant="danger">{error}</Message>}
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
            className="btn btn-md btn-outline-warning"
            variant="light"
          >
            KAYDET
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Siparişlerim</h2>
        {loadingMyOrders ? (
          <Loader />
        ) : errorMyOrders.length > 0 ? (
          <Message variant="danger">{errorMyOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TARİH</th>
                <th>TOPLAM</th>
                <th>ÖDENDİ</th>
                <th>TESLİM EDİLDİ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice} TL</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "#ff0000" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "#ff0000" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        className="btn btn-sm btn-outline-success"
                        variant="light"
                      >
                        DETAY
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
