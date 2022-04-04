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
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" width="150px" height="100px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/cart">
              <span
                className="p1 fa-stack fa-2x has-badge"
                data-count={Items.length > 0 ? Items.length : 0}
                style={{ margin: '0 0 0 200px' }}
              >
                <i className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse"></i>
              </span>
            </Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <NavDropdown.Item href="/profile" onClick={logoutUserDetails}>
                  Profilim
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Çıkış
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">
                <i className="fas fa-user fa-2x"></i>
                Giriş Yap
              </Nav.Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <NavDropdown.Item href="/admin/userlist">
                  Kullanıcılar
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/admin/productlist">
                  Ürünler
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/admin/orderlist">
                  Siparişler
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
