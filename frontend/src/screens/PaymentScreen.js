import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../store/payment";

const PaymentScreen = ({ history }) => {
  const shipping = useSelector((state) => state.entities.shipping);
  const { shippingAddress } = shipping;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("CreditCard");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Ödeme Seçeneklerim</h1>
      <Form onSubmit={submitHandler} className="d-grid gap-2">
        <Form.Group>
          <Form.Label as="legend">Ödeme Tipini Seç</Form.Label>
          <Col>
            {/* <Form.Check type='radio' label='PayPal' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={e => setPaymentMethod(e.target.value)}></Form.Check> */}
            <Form.Check
              type="radio"
              label="Kredi Kartı"
              id="CreditCard"
              name="paymentMethod"
              value="CreditCard"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={e => setPaymentMethod(e.target.value)}></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type="submit" className="btn btn-md btn-success">
          Devam Et {">"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
