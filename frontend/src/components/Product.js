import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="card border-light my-4">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={` ${product.numReviews}`} />
        </Card.Text>
        <Card.Text as="h3">{(product.price * 9).toFixed(0)} TL</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
