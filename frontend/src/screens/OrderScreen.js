import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails } from '../store/order';

const OrderScreen = ({ match }) => {
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.entities.order);
    const { lists: order, loading, error } = orderDetails

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id))
    }, [])

    return (
        loading ? <Loader /> : error.length > 0 ? <Message variant='danger'>{error}</Message> :
            <>
                <h1>Siparişlerim {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Adres Bilgilerim</h2>
                                <p>
                                    <strong>İsim: </strong> {order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong> {' '}
                                    <a href={`mailto:${order.user.name}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Adres: </strong>
                                    {order.shippingAddress.address},{" "}
                                    {order.shippingAddress.postalCode},{" "}
                                    {order.shippingAddress.city}/
                                    {order.shippingAddress.country}
                                </p>
                                {order.isPaid && (order.isDelivered ? (
                                    <Message variant='success'>{order.deliveredAt} tarihinde Teslim Edildi.</Message>
                                ) : (
                                    <Message variant='danger'>Teslim Edilmedi !</Message>
                                ))}
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Ödeme Seçenekleri</h2>
                                <p>
                                    <strong>Seçilen: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Message variant='success'>{order.paidAt} tarihinde Ödendi</Message>
                                ) : (
                                    <Message variant='danger'>Ödenmedi !</Message>
                                )}
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Sipariş Listesi</h2>
                                {order.orderItems.length === 0 ? <Message>Sepetin boş !</Message> : (<ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                        <Col>{order.itemsPrice} TL</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Kargo</Col>
                                        <Col>{order.shippingPrice} TL</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Vergi</Col>
                                        <Col>{order.taxPrice} TL</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Toplam</Col>
                                        <Col>{order.totalPrice} TL</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    {error.length > 0 && <Message variant='danger'>{error}</Message>}
                                </ListGroupItem>
                                {/* <ListGroupItem className="d-grid gap-2">
                                <Button type='button' className='btn btn-md btn-outline-success' disabled={order.orderItems.length === 0} onClick={placeOrderHandler}>Sipariş Ver</Button>
                            </ListGroupItem> */}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>

    )
}

export default OrderScreen
