import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from '../components/Message';
import { createOrder } from '../store/order';

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();

    const shipping = useSelector(state => state.entities.shipping);
    const payment = useSelector(state => state.entities.payment);
    const cart = useSelector(state => state.entities.cartItem);

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    let itemsPrice = cart.Items.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0);
    let shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 100);
    let taxPrice = addDecimals(Number((0.18 * itemsPrice).toFixed(2)));
    let total = addDecimals((Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2));

    const orderCreate = useSelector(state => state.entities.order)
    const { lists, success, error } = orderCreate

    useEffect(() => {
        if(success) {
            history.push(`/order/${lists._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.Items,
            shippingAddress: shipping.shippingAddress,
            paymentMethod: payment.paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice: total
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Adres Bilgilerim</h2>
                            <p>
                                <strong>Adres: </strong>
                                {shipping.shippingAddress.address},{" "}
                                {shipping.shippingAddress.postalCode},{" "}
                                {shipping.shippingAddress.city}/
                                {shipping.shippingAddress.country}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Ödeme Seçenekleri</h2>
                            <strong>Seçilen: </strong>
                            {payment.paymentMethod}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Sipariş Listesi</h2>
                            {cart.Items.length === 0 ? <Message>Sepetin boş !</Message> : (<ListGroup variant='flush'>
                                {cart.Items.map((item, index) => (
                                    <ListGroupItem key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>{item.qty} x {item.price} TL = {item.qty * item.price} TL</Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>)}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='Flush'>
                            <ListGroupItem>
                                <h2>Sipariş Özeti</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Ürünler</Col>
                                    <Col>{itemsPrice} TL</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Kargo</Col>
                                    <Col>{shippingPrice} TL</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Vergi</Col>
                                    <Col>{taxPrice} TL</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Toplam</Col>
                                    <Col>{total} TL</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error.length > 0 && <Message variant='danger'>{error}</Message>}
                            </ListGroupItem>
                            <ListGroupItem className="d-grid gap-2">
                                <Button type='button' className='btn btn-md btn-outline-success' disabled={cart.Items.length === 0} onClick={placeOrderHandler}>Sipariş Ver</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
