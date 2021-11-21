import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrderDetails, updateOrderPay, orderPayReset } from "../store/order";

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.entities.order);
  const { lists: order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.entities.order);
  const { loading: loadingPay, success: successPay, errorPay } = orderPay;

  const users = useSelector((state) => state.entities.users);
  const { userInfo } = users;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const handleToken = async (token) => {
    const response = await axios.post("/api/config/stripe", { token, order });
    const { status } = response.data;

    // console.log(response);
    // write function
    stripeSuccess(status, response.data);
  };

  const stripeSuccess = (status, data) => {
    if (status === "success") {
      dispatch(updateOrderPay(match.params.id, data));
    } else {
      dispatch(updateOrderPay(match.params.id, data));
    }
  };

  useEffect(() => {
    dispatch({ type: orderPayReset.type });
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (!order.isPaid && successPay) {
      dispatch(getOrderDetails(match.params.id));
    }
    // eslint-disable-next-line
  }, [dispatch, order.isPaid, successPay]);

  return loading ? (
    <Loader />
  ) : error.length > 0 ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Siparişlerim {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Adres Bilgilerim</h2>
              <p>
                <strong>İsim: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.name}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Adres: </strong>
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.city}
                /{order.shippingAddress.country}
              </p>
              {order.isPaid &&
                (order.isDelivered ? (
                  <Message variant="success">
                    {order.deliveredAt} tarihinde Teslim Edildi.
                  </Message>
                ) : (
                  <Message variant="danger">Teslim Edilmedi !</Message>
                ))}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Ödeme Seçenekleri</h2>
              <p>
                <strong>Seçilen: </strong>
                {order.paymentMethod}
              </p>
              {errorPay.length > 0 ? (
                <Message variant="danger">HATA !!!</Message>
              ) : order.isPaid ? (
                <Message variant="success">
                  {order.paidAt} tarihinde Ödendi
                </Message>
              ) : (
                <Message variant="danger">Ödenmedi !</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Sipariş Listesi</h2>
              {order.orderItems.length === 0 ? (
                <Message>Sepetin boş !</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} TL = {item.qty * item.price}{" "}
                          TL
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="Flush">
              <ListGroupItem>
                <h2>Sipariş Özeti</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Ürünler</Col>
                  <Col>{order.itemsPrice} TL</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Kargo</Col>
                  <Col>{order.shippingPrice} TL</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Vergi</Col>
                  <Col>{order.taxPrice} TL</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Toplam</Col>
                  <Col>{order.totalPrice} TL</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error.length > 0 && (
                  <Message variant="danger">{error}</Message>
                )}
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem className="d-grid gap-2">
                  {loadingPay && <Loader />}
                  <StripeCheckout
                    stripeKey="pk_test_51JtdgkCpdL7hJ0b5ma1ScOxdVJIpVHqezNcoXBJv3IIpZRU0wenN10HX3tW4yO5tTolofhAs29Oa4RFIz4Rzl07300mrxG3SuL"
                    token={handleToken}
                    amount={order.totalPrice * 100}
                    currency="TRY"
                    name={order._id}
                    email={order.user.email}
                  />
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
