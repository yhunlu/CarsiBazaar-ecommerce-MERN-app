import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { loadProductById } from "../store/productDetail";
import EntryForm from "../components/common/EntryForm";
import { updateProduct, resetProduct } from "../store/productNew";

const ProductListScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.entities.productDetail);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector((state) => state.entities.productNew);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetProduct());
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(loadProductById(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link
        to="/admin/productlist"
        className="btn btn-md btn-outline-warning my-3"
      >
        Geri Git
      </Link>
      <FormContainer className="login">
        <h1>ÜRÜN BİLGİSİ DÜZENLEME</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate.length > 0 && (
          <Message variant="danger">{errorUpdate}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error.length > 0 ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className="d-grid gap-4">
            <EntryForm
              type="text"
              name={name}
              nameTR="İsim"
              placeholderTR="İsmini Yaz"
              onChange={(e) => setName(e.target.value)}
            />

            <EntryForm
              type="text"
              name={brand}
              nameTR="Marka"
              placeholderTR="Markasını Yaz"
              onChange={(e) => setBrand(e.target.value)}
            />

            <EntryForm
              type="text"
              name={category}
              nameTR="Kategori"
              placeholderTR="Kategorisini Yaz"
              onChange={(e) => setCategory(e.target.value)}
            />

            <EntryForm
              as="textarea"
              type="text"
              name={description}
              nameTR="Açıklama"
              placeholderTR="Açıklamasını Yaz"
              onChange={(e) => setDescription(e.target.value)}
            />

            <EntryForm
              type="text"
              name={image}
              nameTR="Resim"
              placeholderTR="Resimleri Seç"
              onChange={(e) => setImage(e.target.value)}
            />

            <EntryForm
              type="number"
              name={price}
              nameTR="Fiyat"
              placeholderTR="Fiyatı Belirle"
              onChange={(e) => setPrice(e.target.value)}
            />

            <EntryForm
              type="number"
              name={countInStock}
              nameTR="Stok"
              placeholderTR="Stok Durumun"
              onChange={(e) => setCountInStock(e.target.value)}
            />

            <Button
              type="submit"
              className="btn btn-md btn-outline-warning"
              variant="light"
            >
              KAYDET
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductListScreen;
