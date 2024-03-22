import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  message,
} from "antd";
import moment from "moment";
import { axiosClient } from "src/axios/AxiosClient";

const { Meta } = Card;
const { Option } = Select;

const MyProductPage = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [auctionFormData, setAuctionFormData] = useState({
    product_id: 0,
    startDay: moment().toISOString(),
    auctionDay: moment().toISOString(),
    auction_Name: "",
    deposit_Money: 0,
    status: "",
    password: "",
  });
  const [packageId, setPackageId] = useState(0); // Package ID của người dùng
  const [showBuyPackage, setShowBuyPackage] = useState(false); // Trạng thái hiển thị nút "Buy Package"
  const [showRegisterButton, setShowRegisterButton] = useState(true); // Trạng thái hiển thị nút "Register Auction"

  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const userId = accountLoggedIn.id;

  useEffect(() => {
    fetchProducts();
    fetchPackageId();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosClient.get(
        `/ProductOwner/GetProductByProductOwnerId?ownerId=${userId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error appropriately
    }
  };

  const fetchPackageId = async () => {
    try {
      const response = await axiosClient.get(
        "/Manage_Manager_Accounts/GetAllUser"
      );
      // Lấy package_id của người dùng từ phản hồi API
      const userPackageId = response.data.find(
        (user) => user.id === userId
      )?.package_id;
      setPackageId(userPackageId);
      setShowBuyPackage(userPackageId === 1); // Nếu package_id là 1, hiển thị nút "Buy Package"
      setShowRegisterButton(userPackageId === 2); // Nếu package_id là 2, hiển thị nút "Register Auction"
    } catch (error) {
      console.error("Error fetching package id:", error);
      // Handle error appropriately
    }
  };

  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
  };

  const handleAuctionFormChange = (changedValues) => {
    setAuctionFormData({ ...auctionFormData, ...changedValues });
  };

  const handleAuctionFormSubmit = async (values) => {
    try {
      // Thêm "user_id" vào dữ liệu gửi đi
      const formDataWithUserId = {
        ...values,
        user_id: userId,
      };

      const response = await axiosClient.post(
        "/api/Auction/CreateAuction",
        formDataWithUserId // Sử dụng dữ liệu đã có "user_id"
      );
      console.log("Auction created:", response.data);
      // Reset form and close modal
      setAuctionFormData({
        product_id: 0,
        startDay: moment().toISOString(),
        auctionDay: moment().toISOString(),
        auction_Name: "",
        deposit_Money: 0,
        status: "",
        password: "",
      });
      handleToggleModal();
    } catch (error) {
      console.error("Error creating auction:", error);
      // Handle error appropriately
    }
  };

  const handleBuyPackage = async () => {
    try {
      axios({
        method: "post",
        url:
          "https://localhost:7022/api/ProductOwner/PurchasePackage?userId=" +
          userId,
        // data: { userId },
      });
      message.success("Package purchased successfully!");
      // Sau khi mua gói, cần cập nhật lại packageId để kích hoạt nút "Register Auction"
      setPackageId(2);
      setShowBuyPackage(false); // Ẩn nút "Buy Package" sau khi mua thành công
      setShowRegisterButton(true); // Hiển thị nút "Register Auction"
    } catch (error) {
      console.error("Error purchasing package:", error);
      message.error("Failed to purchase package. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">My Products</h2>
      {showBuyPackage && (
        <Button
          type="primary"
          style={{ marginBottom: "1rem" }}
          onClick={handleBuyPackage}
        >
          Buy Package
        </Button>
      )}
      {showRegisterButton && (
        <Button
          type="primary"
          style={{ marginBottom: "1rem", marginLeft: "1rem" }}
          onClick={handleToggleModal}
        >
          Register Auction
        </Button>
      )}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.product_Name} src={product.image} />}
            >
              <Meta
                title={product.product_Name}
                description={`ISBN: ${product.isbn}`}
              />
            </Card>
          </div>
        ))}
      </div>

      <Modal
        title="Register Auction"
        visible={modalVisible}
        onCancel={handleToggleModal}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleAuctionFormSubmit}
          onValuesChange={handleAuctionFormChange}
        >
          <Form.Item
            label="Product"
            name="product_id"
            rules={[{ required: true, message: "Please select a product!" }]}
          >
            <Select onChange={handleProductSelect} value={selectedProductId}>
              {products.map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.product_Name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Start Day"
            name="startDay"
            rules={[{ required: true, message: "Please select start day!" }]}
          >
            <DatePicker
              showTime
              disabledDate={(current) =>
                current && current < moment().endOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            label="Auction Day"
            name="auctionDay"
            rules={[{ required: true, message: "Please select auction day!" }]}
          >
            <DatePicker showTime />
          </Form.Item>

          <Form.Item
            label="Auction Name"
            name="auction_Name"
            rules={[{ required: true, message: "Please input auction name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Deposit Money"
            name="deposit_Money"
            rules={[{ required: true, message: "Please input deposit money!" }]}
          >
            <InputNumber min={1} max={10000000000000} />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input status!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ display: "flex" }}
            >
              Register Auction
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyProductPage;
