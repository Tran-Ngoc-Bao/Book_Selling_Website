import React from "react";
import popup from "./PopUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";
import { createOrder } from "../../redux/features/user/OrderSlide";

function Popup({ isOpen, onClose, children }) {
  const user = useSelector((state) => state.user.user.user_info);
  const container = useSelector((state) => state.purchase);
  const purchase = container.bookbuy;
  const purchasecost = container.totalPrice;
  const dispatch = useDispatch();
  async function thanhtoan() {
    const rep = await dispatch(createOrder());
    if (rep) {
      onClose();
    }
  }
  // Render nothing if the modal is not open
  if (!isOpen) return null;
  if (user.name === null) return <p> Hãy đăng nhập</p>;

  return (
    <div className={popup.popup_overlay} onClick={onClose}>
      <div className={popup.popup_content} onClick={(e) => e.stopPropagation()}>
        <button className={popup.popup_close} onClick={onClose}>
          X
        </button>
        {children}
        <div className="Buycontainer">
          <h2>Kiểm tra đơn hàng</h2>
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
                <p>Số lượng: {item.quantity}</p>
                <p>Tạm tính: {item.totalprice}</p>
                {/* <p>{JSON.stringify(item)}</p> */}
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
          <p>Tài khoản ngân hàng {user.bank.name}</p>
          <p>Số tài khoản{user.bank.seri}</p>
          <p>Vận chuyển tới{user.address}</p>
          <p>Tiền đơn hàng{purchasecost}</p>
          <p>Phí vận chuyển: 20.000</p>
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              height: 5,
            }}
          />
          <p>Tổng cộng</p>
          <button className="order" onClick={thanhtoan}>
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
