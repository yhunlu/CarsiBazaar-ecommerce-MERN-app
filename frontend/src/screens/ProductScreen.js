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
import {
  createProductReview,
  productReviewReset,
} from "../store/productReview";
import Loader from "../components/Loader";
import Message from "../components/Message";
import EntryForm from "../components/common/EntryForm";

const ProductScreen = ({ history, match }) => {
  var [qty, setQty] = useState(1);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.entities.productDetail);
  const { loading, error, product } = productDetail;

  const userLogin = useSelector((state) => state.entities.users);
  const { userInfo } = userLogin;

  const productReview = useSelector((state) => state.entities.productReview);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productReview;

  useEffect(() => {
    if (successReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: productReviewReset.type });
    }
    dispatch(loadProductById(match.params.id));
  }, [dispatch, match, successReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Link className="btn btn-md btn-outline-primary my-3" to="/">
        <strong>Geri Git</strong>
      </Link>
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
                <ListGroupItem>Fiyat: {product.price} TL</ListGroupItem>
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
                        <span className="badge bg-info">
                          <h5>{product.price} TL </h5>
                        </span>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col as="h5">Durum:</Col>
                      <Col>
                        {product.countInStock > 0 && (
                          <span className="badge bg-warning">
                            <h5>
                              {product.countInStock > 0
                                ? "Stokta"
                                : "Stokta Yok"}
                            </h5>
                          </span>
                        )}
                        {product.countInStock === 0 && (
                          <span className="badge bg-danger">
                            <h5>
                              {product.countInStock > 0
                                ? "Stokta"
                                : "Stokta Yok"}
                            </h5>
                          </span>
                        )}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col as="h5">Miktar</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem className="d-grid gap-2">
                    <Button
                      onClick={addToCartHandler}
                      className="btn btn-md btn-outline-success"
                      variant="light"
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
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <h2>Yorumlar</h2>
                {product.reviews.length === 0 && (
                  <Message>Henüz yorum yapılmadı.</Message>
                )}
                <ListGroup>
                  {product.reviews.map((review) => (
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>
                        {review.createdAt.substring(0, 10) +
                          " - " +
                          review.createdAt.substring(12, 19)}
                      </p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}
                  <ListGroupItem>
                    <h4>Yorum Yaz</h4>
                    {errorReview.length > 0 && (
                      <Message variant="danger">{errorReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler} className="d-grid gap-2">
                        <h5>{userInfo.name}:</h5>
                        <Form.Label>Puanım</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Seç...</option>
                          <option value="1">1 - Kötü</option>
                          <option value="2">2 - Eh İşte</option>
                          <option value="3">3 - İyi</option>
                          <option value="4">4 - Çok İyi</option>
                          <option value="5">5 - Mükemmel</option>
                        </Form.Control>

                        <EntryForm
                          as="textarea"
                          row={3}
                          type="text"
                          name={comment}
                          nameTR="Yorumum"
                          placeholderTR="Yorum Yaz"
                          onChange={(e) => setComment(e.target.value)}
                        />

                        <Button type="submit" variant="primary">
                          Yorum Yap
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Lütfen <Link to="/login">Giriş Yap</Link> yorum yazmak
                        için
                      </Message>
                    )}
                  </ListGroupItem>
                </ListGroup>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
