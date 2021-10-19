import React, { useEffect, useState } from "react";
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
import Rating from "../components/Rating";
import { loadProductById } from "../store/productDetail";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.entities.productDetail);
  const { loading, error, product } = productDetail;

  useEffect(() => {
    dispatch(loadProductById(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-outline-primary my-3" to="/">
        Geri Git
      </Link>
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={` ${product.numReviews}`}
                />
              </ListGroupItem>
              <ListGroupItem>
                Fiyat: {(product.price * 9).toFixed(0)} TL
              </ListGroupItem>
              <ListGroupItem>Açıklama: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card className="card border-light mb-3">
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col as="h5">Fiyat:</Col>
                    <Col>
                      <span className="badge bg-info rounded-pill">
                        <h5>{(product.price * 9).toFixed(0)} TL </h5>
                      </span>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col as="h5">Durum:</Col>
                    <Col>
                      {product.countInStock > 0 && (
                        <span className="badge bg-warning rounded-pill">
                          <h5>
                            {product.countInStock > 0 ? "Stokta" : "Stokta Yok"}
                          </h5>
                        </span>
                      )}
                      {product.countInStock === 0 && (
                        <span className="badge bg-danger rounded-pill">
                          <h5>
                            {product.countInStock > 0 ? "Stokta" : "Stokta Yok"}
                          </h5>
                        </span>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Miktar</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem className="d-grid gap-2">
                  <Button
                    onClick={addToCartHandler}
                    className="btn btn-lg btn-success"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Sepete Ekle
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
