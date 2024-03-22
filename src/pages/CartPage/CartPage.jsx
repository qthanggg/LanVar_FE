import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Table } from "reactstrap";
import { BannerPath } from "src/components";
import axios from "axios";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const dispatch = useDispatch();
  const [orderItems, setOrderItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://localhost:7022/api/OrderItem/GetAllUserItem",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Lọc các sản phẩm có thuộc tính isSelected là false
      const filteredItems = response.data.filter((item) => !item.isSelected);
      setOrderItems(filteredItems);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleCheckout = async () => {
    try {
      if (!selectedItemId) {
        console.log("Please select a product before checkout.");
        return;
      }
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://localhost:7022/api/OrderItem/SelectItem/${selectedItemId}`,
        { isSelected: true }, // Dữ liệu cần gửi đi để cập nhật isSelected
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const responseData = await res.text(); // Đọc dữ liệu từ response
      //console.log(responseData); // In ra dữ liệu từ response
      console.log(res);
      navigate("/checkout");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const renderCartRow = () => {
    return orderItems.map((orderItem) => (
      <tr key={orderItem.id}>
        <td>
          <input
            type="checkbox"
            checked={selectedItemId === orderItem.id}
            onChange={() => handleCheckboxChange(orderItem.id)}
          />
        </td>
        <th scope="row">{orderItem.id}</th>
        <td className="cart-area__image">
          <img width={150} height={100} src={orderItem.image} alt="Product" />
        </td>
        <td>{orderItem.product_name}</td>
        <td>${orderItem.price}</td>
        <td>${orderItem.desciption}</td>
      </tr>
    ));
  };

  return (
    <>
      <BannerPath title="Shopping Cart" path="Home - Shopping Cart" />
      <Container className="cart-area">
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{renderCartRow()}</tbody>
        </Table>
        <Button
          color="primary"
          outline
          className="cart-area__btn-checkout"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Container>
    </>
  );
};
export default CartPage;
