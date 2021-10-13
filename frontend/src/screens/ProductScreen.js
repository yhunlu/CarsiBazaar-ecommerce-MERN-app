import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Image,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    };

    fetchProduct();
  }, [match]);

  return (
    <>
      <Link className="btn btn-outline-primary my-3" to="/">
        Geri Git
      </Link>
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
              <Rating value={product.rating} text={` ${product.numReviews}`} />
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
              <ListGroupItem className="d-grid gap-2">
                <Button
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
    </>
  );
};

export default ProductScreen;
