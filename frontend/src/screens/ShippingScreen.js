import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../store/shipping";

const ShippingScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.entities.users);
  const { userInfo } = userLogin;

  if (!userInfo) {
    history.push("/login");
  }

  const shipping = useSelector((state) => state.entities.shipping);
  const { shippingAddress } = shipping;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Adres Bilgilerim</h1>
      <Form onSubmit={submitHandler} className="d-grid gap-2">
        <Form.Group controlId="address">
          <Form.Label>Adres</Form.Label>
          <Form.Control
            type="address"
            placeholder="Açık Adresinizi Yazınız"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Şehir</Form.Label>
          <Form.Control
            type="city"
            placeholder="Şehirinizi Yazınız"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Posta Kodu</Form.Label>
          <Form.Control
            type="postalCode"
            placeholder="Posta Kodunuzu Yazınız"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Ülke</Form.Label>
          <Form.Control
            type="country"
            placeholder="Ülkenizi Yazınız"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" className="btn btn-md btn-outline-success">
          Devam Et
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
