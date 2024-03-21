import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Input, InputNumber, Checkbox, Button } from "antd";
import { axiosClient } from "src/axios/AxiosClient";
import { useSelector } from "react-redux";

const ProductOwnerPage = () => {
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const userId = accountLoggedIn.id;
  const [formData, setFormData] = useState({
    isbn: "",
    user_id: userId,
    product_Name: "",
    product_Description: "",
    image: "",
    product_Price: 0,
    type: "",
    status: true,
  });

  const [form] = Form.useForm();
  const [existingProductNames, setExistingProductNames] = useState([]);

  useEffect(() => {
    fetchExistingProductNames();
  }, []);

  const fetchExistingProductNames = async () => {
    try {
      const response = await axiosClient.get("/SearchProduct/GetAllProducts");
      const productNames = response.data.map((product) => product.product_Name);
      setExistingProductNames(productNames);
    } catch (error) {
      console.error("Error fetching existing product names:", error);
    }
  };

  const handleChange = (changedValues) => {
    setFormData({ ...formData, ...changedValues });
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post(
        "/ProductOwner/CreateProduct",
        formData
      );
      console.log("Product created:", response.data);
      toast("Create Success");
      form.resetFields();
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error appropriately
    }
  };

  const validatePrice = (rule, value, callback) => {
    if (value <= 0) {
      callback("Price must be greater than 0!");
    } else {
      callback();
    }
  };

  const validateName = (rule, value, callback) => {
    if (existingProductNames.includes(value)) {
      callback("Product name already exists!");
    } else {
      callback();
    }
  };

  return (
    <div className="container col-md-6">
      <div className="">
        <h2>Create Product</h2>
        <Form form={form} onFinish={handleSubmit} onValuesChange={handleChange}>
          <Form.Item
            label="ISBN"
            name="isbn"
            rules={[{ required: true, message: "Please input ISBN!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product Name"
            name="product_Name"
            rules={[
              { required: true, message: "Please input product name!" },
              { validator: validateName },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User ID"
            name="user_id"
            hidden={true} // Đặt hidden thành true để ẩn trường này
            initialValue={formData.user_id} // Đặt giá trị ban đầu của trường này thành userID
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="product_Description"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Image URL" name="image">
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="product_Price"
            rules={[
              { required: true, message: "Please input price!" },
              { validator: validatePrice },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProductOwnerPage;
