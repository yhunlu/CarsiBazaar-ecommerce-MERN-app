import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Giriş Yap</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Giriş Yap</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Adres Bilgilerim</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Adres Bilgilerim</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Ödeme Seçenekleri</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Ödeme Seçenekleri</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Sipariş Ver</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Sipariş Ver</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
