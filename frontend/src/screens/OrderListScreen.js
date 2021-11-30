import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchOrderList, deleteOrderById } from "./../store/orderList";
import Paginate from "../components/Paginate";

const OrderListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.entities.orderList);
  const {
    loading,
    error,
    orders,
    success: successDelete,
    page,
    pages,
  } = productList;

  const userLogin = useSelector((state) => state.entities.users);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchOrderList("", pageNumber));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm("Silmek istediğinden emin misin?")) {
      dispatch(deleteOrderById(id));
    }
  };

  return (
    <>
      <h1>SİPARİŞLER</h1>
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm"
            size="sm"
            variant="light"
          >
            <thead>
              <tr>
                <th>ALICI</th>
                <th>SİPARİŞ ID</th>
                <th>SİPARİŞ DETAYLARI</th>
                <th>TOPLAM FİYAT</th>
                <th>OLUŞTURMA TARİHİ</th>
                <th>GÜNCELLEME TARİHİ</th>
                <th>ÖDENDİ</th>
                <th>TESLİM EDİLDİ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.user.name}</td>
                  <td>{order._id}</td>
                  <td>
                    {order.orderItems.map((item) => (
                      <>
                        {/* <table className="orderedItemTable"> */}
                        <Table
                          striped
                          bordered
                          hover
                          responsive
                          className="table-sm"
                          size="sm"
                          variant="dark"
                        >
                          <thead>
                            <tr>
                              <th>SATICI</th>
                              <th>ÜRÜN ID</th>
                              <th>ÜRÜN Resmi</th>
                              <th>ÜRÜN İSMİ</th>
                              <th>ÜRÜN MİKTARI</th>
                              <th>ÜRÜN FİYATI</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr key={item._id}>
                              <td>{item.product.user.name}</td>
                              <td>{item._id}</td>
                              <td>
                                <Link to={`/product/${item.product._id}`}>
                                  <Card.Img src={item.image} variant="top" />
                                </Link>
                              </td>
                              <td>{item.name}</td>
                              <td>{item.qty}</td>
                              <td>{item.price} TL</td>
                            </tr>
                          </tbody>
                          {/* </table> */}
                        </Table>
                      </>
                    ))}
                  </td>
                  <td>{order.totalPrice} TL</td>
                  <td>
                    {order.createdAt.substring(0, 10) +
                      " [" +
                      order.createdAt.substring(12, 19) +
                      "]"}
                  </td>
                  <td>
                    {order.updatedAt.substring(0, 10) +
                      " [" +
                      order.updatedAt.substring(12, 19) +
                      "]"}
                  </td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "#ff0000" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "#ff0000" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/order/${order._id}`}>
                      <Button
                        className="btn btn-sm btn-outline-success"
                        variant="light"
                      >
                        DETAY
                      </Button>
                    </LinkContainer>
                    {!order.isPaid && (
                      <Button
                        className="btn btn-sm btn-danger"
                        id="productorderdelbutton"
                        onClick={() => deleteHandler(order._id)}
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
            pageName="orderlist"
          />
        </>
      )}
    </>
  );
};

export default OrderListScreen;
