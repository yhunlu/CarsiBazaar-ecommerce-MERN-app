import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getproductTop } from "../store/productTop";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.entities.productTop);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(getproductTop());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error.length > 0 ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel variant="dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>{product.name}</h2>
              <h3>{product.price} TL</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
