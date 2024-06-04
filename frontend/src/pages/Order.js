import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrder } from "../redux/features/user/OrderSlide";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import styles from "./Order.module.css";

function Order() {
  const dispatch = useDispatch();
  const orderlist = useSelector((state) => state.order.order_list);
  const login = useSelector((state) => state.user.login);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredOrders = statusFilter
    ? orderlist.filter((order) => order.status === statusFilter)
    : orderlist;

  // Calculate the orders to display based on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.orderContainer}>
      <Header />
      <div className={styles.page_content}>
        {!login && (
          <div className={styles.no_login}>
            <span className={styles.no_login_prompt}>
              Hãy đăng nhập để xem đơn hàng của bạn
            </span>
            <div className={styles.no_login_notification_link}>
              <Link to="/login">
                <p>Đăng nhập</p>
              </Link>
            </div>
          </div>
        )}
        {login && (
          <div className={styles.logged_in_notification}>
            <span className={styles.orderHeader}>Đơn hàng</span>
            <div className={styles.statusFilter}>
              <label htmlFor="status">Lọc theo trạng thái: </label>
              <select
                id="status"
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option value="">All</option>
                <option value="CXN">Chờ xác nhận</option>
                <option value="CLH">Chờ lấy hàng</option>
                <option value="CGH">Chờ giao hàng</option>
                <option value="DG">Đã giao</option>
                <option value="DH">Đã hủy</option>
                <option value="TH">Trả hàng</option>
              </select>
            </div>
            <div>
              {currentOrders &&
                currentOrders.map((order) => (
                  <div key={order._id} className={styles.orderItem}>
                    <img
                      src={`../images/${order.bookid}.jpeg`}
                      width={70}
                      height={70}
                      alt="small book"
                      className={styles.orderImage}
                    />
                    <div className={styles.orderDetails}>
                      <p>Mã đơn: {order._id}</p>
                      <div className={styles.orderInfo}>
                        <p>Mã sản phẩm: {order.bookid}</p>
                        <p>Số lượng: {order.quantity}</p>
                        <p>Trạng thái: {order.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.pagination}>
              <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? "disabled" : ""}
              >
                Previous
              </button>
              <p>
                {currentPage} / {totalPages}
              </p>
              <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "disabled" : ""}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Order;
