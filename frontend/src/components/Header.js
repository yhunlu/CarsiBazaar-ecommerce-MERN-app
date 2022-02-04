import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../store/users';
import { userDetailsLogout } from '../store/userDetails';
import SearchBox from './SearchBox';
import logo from '../czrbzr.png';

const Header = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.entities.cartItem);
  const { Items } = cart;

  const userLogin = useSelector((state) => state.entities.users);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(userDetailsLogout());
  };

  const logoutUserDetails = () => {
    dispatch(userDetailsLogout());
  };

  return (
    <header>
      <Navbar
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        expand="sm"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              <img src={logo} alt="logo" width="150px" height="100px" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-sm-0"
              style={{ maxHeight: '70px' }}
              navbarScroll
            >
              <LinkContainer to="/cart">
                <Nav.Link>
                  <span
                    className="p1 fa-stack fa-2x has-badge"
                    data-count={Items.length > 0 ? Items.length : 0}
                  >
                    <i className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse"></i>
                  </span>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item onClick={logoutUserDetails}>
                      Profilim
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Çıkış
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <i className="fas fa-user fa-2x"></i> Giriş Yap
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Kullanıcılar</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Ürünler</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Siparişler</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
