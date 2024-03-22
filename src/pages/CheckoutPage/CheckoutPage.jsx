import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import axios from "axios";

const { Meta } = Card;

const CheckoutPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderCode, setOrderCode] = useState(null);
  const [paymentCallBackResponseData, setPaymentCallBackResponseData] =
    useState(null);

  useEffect(() => {
    loadSelectedItems();

    // Kiểm tra URL khi component được render
    if (
      window.location.href ===
      "https://localhost:7022/api/Bill/Payment-CallBack?vnp_Amount=100000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14352369&vnp_CardType=ATM&vnp_OrderInfo=SPX000000032&vnp_PayDate=20240323004334&vnp_ResponseCode=00&vnp_TmnCode=5KB5SZN9&vnp_TransactionNo=14352369&vnp_TransactionStatus=00&vnp_TxnRef=638467513934329224&vnp_SecureHash=dd1de83cb91bd905cb18274b2d36216a1df6ea75d01b9c3181ed96d0fea266bf128c56f31f09cc573b1d613cbf8b8df5df3788f41809aec4cc578cf3342f4e71"
    ) {
      window.location.href = "/"; // Chuyển hướng về trang chủ
    }
  }, []);

  const loadSelectedItems = async () => {
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

      const filteredItems = response.data.filter((item) => item.isSelected);
      setSelectedItems(filteredItems);
    } catch (error) {
      console.error("Error loading selected items:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://localhost:7022/api/ManageOrder/CreateOrder",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { orderCode } = response.data;
      setOrderCode(orderCode);

      const billResponse = await axios.post(
        "https://localhost:7022/api/Bill/CreateBill",
        { orderCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentCallBackResponse = await axios.post(
        "https://localhost:7022/api/Bill/PaymentCallBack",
        { orderId: orderCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPaymentCallBackResponseData(paymentCallBackResponse.data);
      if (paymentCallBackResponse.data.link) {
        window.open(paymentCallBackResponse.data);
      }
    } catch (error) {
      console.error("Error creating order or bill:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {selectedItems.map((item) => (
        <Card
          key={item.id}
          hoverable
          style={{ width: 240 }}
          cover={<img alt={item.product_name} src={item.image} />}
        >
          <Meta
            title={item.product_name}
            description={`Price: $${item.price}`}
          />
          <Button onClick={handleCheckout} style={{ marginTop: "8px" }}>
            Checkout
          </Button>
        </Card>
      ))}
      {orderCode && <p>Order Code: {orderCode}</p>}
    </div>
  );
};

export default CheckoutPage;
