import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Image,
  Form,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../store/cart";
import Message from "../components/Message";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.entities.cartItem);
  const { Items: cartItem } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Alışveriş Sepeti</h1>
        {cartItem.length === 0 ? (
          <Message>
            Sepetin boş ! <Link to="/">Geri Git</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItem.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card className="card border-light">
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Ara Toplam ({cartItem.reduce((acc, item) => acc + item.qty, 0)})
                parça
              </h2>
              {cartItem
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}{" "}
              TL
            </ListGroupItem>
            <ListGroupItem className="d-grid gap-2">
              <Button
                type="button"
                className="btn btn-lg btn-outline-success"
                disabled={cartItem.length === 0}
                onClick={checkoutHandler}
              >
                Alışverişi Tamamla
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
