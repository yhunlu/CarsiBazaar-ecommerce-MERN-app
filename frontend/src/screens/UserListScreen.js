import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "./../store/userList";
import Paginate from "../components/Paginate";
import SearchBoxAdminControl from "../components/SearchBoxAdminControl";

const UserListScreen = ({ history, match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.entities.userList);
  const {
    loading,
    error,
    users,
    success: successDelete,
    page,
    pages,
  } = userList;

  const userLogin = useSelector((state) => state.entities.users);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(keyword, pageNumber));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, keyword, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm(`${id} Silmek istediğinden emin misin?`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Row>
        <Col className="text-right">
          <SearchBoxAdminControl
            history={history}
            pageName="userlist"
            tagname="Müşteri Ara..."
          />
        </Col>
      </Row>
      <h1>Kullanıcılar</h1>
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>İSİM</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer
                      to={`/admin/user/${user._id}/edit`}
                      className="editbutton"
                    >
                      <Button className="btn btn-sm btn-dark">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    {!user.isAdmin && (
                      <Button
                        className="btn btn-sm btn-danger"
                        id="userlistdelbutton"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            page={page}
            pages={pages}
            isAdmin={true}
            pageName="userlist"
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default UserListScreen;
