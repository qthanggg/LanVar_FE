// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, Container, Table } from "reactstrap";
// import { BannerPath } from "src/components";
// import "./CartPage.css";
// import { fetchOrderItems } from "src/app/feature/orderItem/OrderItemSlice";
// import { useNavigate } from "react-router-dom";

// export const CartPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const orderItems = useSelector((state) => state.orderItems.items);

//   useEffect(() => {
//     dispatch(fetchOrderItems());
//   }, [dispatch]);

//   const renderCartRow = () => {
//     return orderItems.map((orderItem) => (
//       <tr key={orderItem.id}>
//         <th scope="row">{orderItem.id}</th>
//         <td className="cart-area__image">
//           <img width={150} height={100} src={orderItem.image} />
//         </td>
//         <td>{orderItem.product_Name}</td>
//         <td>${orderItem.product_Price}</td>
//         <td>${orderItem.product_Price}</td>
//       </tr>
//     ));
//   };

//   return (
//     <>
//       <BannerPath title="Shopping Cart" path="Home - Shopping Cart" />
//       <Container className="cart-area">
//         <Table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th colSpan={2}>Product</th>
//               <th>Price</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>{renderCartRow()}</tbody>
//         </Table>
//         <Button
//           color="primary"
//           outline
//           className="cart-area__btn-checkout"
//           onClick={() => {
//             navigate("/checkout");
//           }}
//         >
//           Checkout
//         </Button>
//       </Container>
//     </>
//   );
// };
import React, { useState, useEffect } from "react";
import axios from "axios";

const CartPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const token = localStorage.getItem("token"); // Lấy token từ LocalStorage

  useEffect(() => {
    // Gửi yêu cầu API khi component được mount
    fetchOrderItems();
  }, []); // Chạy chỉ một lần khi component được mount

  const fetchOrderItems = async () => {
    try {
      // Gửi yêu cầu API để lấy danh sách các mặt hàng trong giỏ hàng của người dùng
      const response = await axios.get(
        "https://localhost:7022/api/OrderItem/GetAllUserItem",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
          },
        }
      );

      // Lấy dữ liệu từ phản hồi và cập nhật state
      setOrderItems(response.data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  return (
    <div>
      <h1>CartPage</h1>
      <ul>
        {/* Lặp qua mỗi mặt hàng và hiển thị thông tin */}
        {orderItems.map((item, index) => (
          <li key={index}>
            <p>Product Name: {item.product_name}</p>
            <p>User Name: {item.user_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
