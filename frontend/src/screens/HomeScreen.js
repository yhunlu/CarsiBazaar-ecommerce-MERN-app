import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { loadProducts } from "./../store/products";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.entities.products);
  const { loading, error, lists } = productList;

  useEffect(() => {
    dispatch(loadProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>En Son Ürünler</h1>
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {lists.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
