import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.entities.cartItem);
  const { Items: cartItem } = cart;

  return (
    <header>
      <Navbar
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        // bg="dark"
        // variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">ÇarşıBazaar</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart"></i>
                  {cartItem.length > 0 && (
                    <span className="badge">{cartItem.length}</span>
                  )}{" "}
                  Sepet
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i> Kayıt Ol
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
