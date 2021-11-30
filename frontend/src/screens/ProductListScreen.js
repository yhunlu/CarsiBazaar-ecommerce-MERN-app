import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Table, Button, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { loadAllProducts, deleteProductById } from "./../store/products";
import { createProduct, resetProduct } from "./../store/productNew";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.entities.products);
  const {
    loading,
    error,
    lists,
    success: successDelete,
    page,
    pages,
  } = productList;

  const productNew = useSelector((state) => state.entities.productNew);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productNew;

  const userLogin = useSelector((state) => state.entities.users);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(resetProduct());

    if (successCreate) {
      history.push(`/admin/products/${createdProduct._id}/edit`);
    }

    if (userInfo && userInfo.isAdmin) {
      dispatch(loadAllProducts("", pageNumber));
    } else {
      history.push("/login");
    }
  }, [
    dispatch,
    history,
    userInfo,
    createdProduct._id,
    successCreate,
    successDelete,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Silmek istediğinden emin misin?")) {
      dispatch(deleteProductById(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row>
        <Col className="text-right">
          <Button
            className="btn btn-md btn-outline-warning my-3"
            variant="light"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Ürün Ekle
          </Button>
        </Col>
      </Row>
      <h1>ÜRÜNLER</h1>
      {loadingCreate && <Loader />}
      {errorCreate.length > 0 && (
        <Message variant="danger">{errorCreate}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>SATICI</th>
                <th>ÜRÜN ID</th>
                <th>İSİM</th>
                <th>RESİM</th>
                <th>MARKA</th>
                <th>KATEGORİ</th>
                <th>AÇIKLAMA</th>
                <th>PUAN</th>
                <th>DEĞERLENDİRME SAYISI</th>
                <th>FİYAT</th>
                <th>STOK</th>
                <th>OLUŞTURMA TARİHİ</th>
                <th>GÜNCELLEME TARİHİ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lists.map((list) => (
                <tr key={list._id}>
                  <td>{list.user.name}</td>
                  <td>{list._id}</td>
                  <td>{list.name}</td>
                  <td>
                    <Link to={`/product/${list._id}`}>
                      <Card.Img src={list.image} variant="top" />
                    </Link>
                  </td>
                  <td>{list.brand}</td>
                  <td>{list.category}</td>
                  <td className="longDescription" style={{ maxWidth: "10rem" }}>
                    {list.description}
                  </td>
                  <td>{list.rating}</td>
                  <td>{list.numReviews}</td>
                  <td>{list.price}</td>
                  <td>{list.countInStock}</td>
                  <td>
                    {list.createdAt.substring(0, 10) +
                      " [" +
                      list.createdAt.substring(12, 19) +
                      "]"}
                  </td>
                  <td>
                    {list.updatedAt.substring(0, 10) +
                      " [" +
                      list.updatedAt.substring(12, 19) +
                      "]"}
                  </td>
                  <td>
                    <LinkContainer
                      to={`/admin/products/${list._id}/edit`}
                      className="editbutton"
                    >
                      <Button className="btn btn-sm btn-dark">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn btn-sm btn-danger"
                      id="productlistdelbutton"
                      onClick={() => deleteHandler(list._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
