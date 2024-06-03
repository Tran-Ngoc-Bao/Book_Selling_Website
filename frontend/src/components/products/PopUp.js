import React, { useState } from "react";
import popupStyles from "./PopUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/features/user/OrderSlide";
import PayPal from "../PayPal";
import { Button } from "bootstrap";

function Popup({ isOpen, onClose, children }) {
  const user = useSelector((state) => state.user.user);
  const container = useSelector((state) => state.purchase);
  const purchase = container.bookbuy;
  const purchasecost = container.totalPrice;
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  async function thanhtoan() {
    const rep = await dispatch(createOrder());
    if (rep) {
      onClose();
    }
  }

  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };

  if (!isOpen) return null;
  if (!user.name) return <p> Hãy đăng nhập</p>;

  return (
    <div className={popupStyles.popup_overlay} onClick={onClose}>
      <div className={popupStyles.popup_content} onClick={(e) => e.stopPropagation()}>
        <button className={popupStyles.popup_close} onClick={onClose}>
          X
        </button>
        {purchasecost === 0 ? (
          <h2>Đơn hàng trống, vui lòng chọn sản phẩm để thanh toán</h2>
        ) : (
          <div className="Buycontainer">
            <h2>Kiem tra don hang</h2>
            {purchase &&
              purchase.map((item) => (
                <div className="row" key={item.name}>
                  <br />
                  <img
                    src={`../images/${item.bookid}.jpeg`}
                    width={50}
                    height={50}
                    alt={"buy book"}
                  />
                  <p>Tên sản phẩm: {item.name}</p>
                  <p>Số lượng: {item.quantity} quyển</p>
                  <p>Tạm tính: {item.totalprice.toLocaleString()} VND</p>
                  <p>{JSON.stringify(item)}</p>
                  <br />
                  <hr
                    style={{
                      color: "red",
                      backgroundColor: "red",
                      height: 3,
                      border: "none",
                    }}
                  />
                </div>
              ))}
            <p>Ship tới: {user.address}</p>
            <p>Số tiền {purchasecost.toLocaleString()} VND</p>
            <p>Phí ship: 20,000 VND</p>
            <hr
              style={{
                color: "black",
                backgroundColor: "black",
                height: 5,
              }}
            />
            <p>Tổng cộng: {(purchasecost + 20000).toLocaleString()} VND</p>
            <button onClick={togglePaymentModal}>Chọn phương thức thanh toán</button>
            {showPaymentModal && (
              <div className={popupStyles.payment_modal}>
                <div className={popupStyles.paymentmethod}>
                  <h3>Chọn phương thức thanh toán:</h3>
                  <ul>
                    <li>
                      <span>
                        <input
                          type="radio"
                          value="COD"
                          checked={payment === "COD"}
                          onChange={() => setPayment("COD")}
                        />
                        Thanh toán khi nhận hàng (COD)
                        </span>
                    </li>
                    <li>
                        <span>
                        <input
                          type="radio"
                          value="Bank"
                          checked={payment === "Bank"}
                          onChange={() => setPayment("Bank")}
                        />
                        Sử dụng tài khoản ngân hàng
                        </span>
                    </li>
                    <li>
                    <span>
                        <input
                          type="radio"
                          value="PayPal"
                          checked={payment === "PayPal"}
                          onChange={() => setPayment("PayPal")}
                        />
                        Thanh toán bằng PayPal
                        </span>
                    </li>
                  </ul>
                </div>
                {payment === "PayPal" && <PayPal total={(purchasecost + 20000)/23000} thanhtoan={thanhtoan}  />}
                {payment === "Bank" && (
                  <div>
                    <p>Ngân hàng: {user.bank.name}</p>
                    <p>Số tài khoản: {user.bank.seri}</p>
                    <br/>
                    <button onClick={()=>{thanhtoan()}}>Đặt hàng</button>
                  </div>
                )}
                {payment === "COD" && (
                  <div>
                    <button onClick={()=>{thanhtoan()}}>Đặt hàng</button>
                  </div>
                )}
                <button onClick={togglePaymentModal}>Đóng</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Popup;
