// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import {
//   Card,
//   Button,
//   Modal,
//   Form,
//   Input,
//   DatePicker,
//   InputNumber,
//   Select,
// } from "antd";
// import moment from "moment";

// const { Option } = Select;

// const MyProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState({});
//   const [auctionFormData, setAuctionFormData] = useState({
//     product_id: 0,
//     startDay: moment().toISOString(),
//     auctionDay: moment().toISOString(),
//     auction_Name: "",
//     deposit_Money: 0,
//     status: true, // Set default value to true
//     password: "",
//   });

//   const accountLoggedIn = useSelector((state) => state.account.loggedIn);
//   const userId = accountLoggedIn.id;

//   useEffect(() => {
//     fetchProductsByOwnerId();
//   }, []);

//   const fetchProductsByOwnerId = async () => {
//     try {
//       const response = await axios.get(
//         `https://localhost:7022/api/ProductOwner/GetProdcutByProductOwnerId?ownerId=${userId}`
//       );
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       // Handle error appropriately
//     }
//   };

//   const handleToggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   const handleProductChange = (value) => {
//     const selectedProduct = products.find((product) => product.id === value);
//     setSelectedProductId(value);
//     setSelectedProduct(selectedProduct);
//   };

//   const handleAuctionFormChange = (changedValues) => {
//     setAuctionFormData({ ...auctionFormData, ...changedValues });
//   };

//   const handleAuctionFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://localhost:7022/api/Auction/CreateAuction",
//         auctionFormData
//       );
//       console.log("Auction created:", response.data);
//       // Reset form
//       setAuctionFormData({
//         product_id: 0,
//         startDay: moment().toISOString(),
//         auctionDay: moment().toISOString(),
//         auction_Name: "",
//         deposit_Money: 0,
//         status: true, // Reset status to true
//         password: "",
//       });
//       // Hide the modal
//       handleToggleModal();
//     } catch (error) {
//       console.error("Error creating auction:", error);
//       // Handle error appropriately
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="mt-4">My Products</h2>
//       <div className="row">
//         {products.map((product) => (
//           <div className="col-md-4 mb-4" key={product.id}>
//             <Card
//               hoverable
//               cover={<img alt={product.product_Name} src={product.image} />}
//             >
//               <Card.Meta
//                 title={product.product_Name}
//                 description={`ISBN: ${product.isbn}`}
//               />
//               <Button type="primary" onClick={handleToggleModal}>
//                 Register Auction
//               </Button>
//             </Card>
//           </div>
//         ))}
//       </div>

//       <Modal
//         title="Register Auction"
//         visible={modalVisible}
//         onCancel={handleToggleModal}
//         footer={null}
//       >
//         <Form layout="vertical" onFinish={handleAuctionFormSubmit}>
//           <Form.Item label="Choose Product" name="product_id">
//             <Select onChange={handleProductChange}>
//               {products.map((product) => (
//                 <Option key={product.id} value={product.id}>
//                   {product.product_Name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item label="Start Day" name="startDay" initialValue={moment()}>
//             <DatePicker showTime />
//           </Form.Item>
//           <Form.Item
//             label="ActionDay"
//             name="auctionDay"
//             initialValue={moment()}
//           >
//             <DatePicker showTime />
//           </Form.Item>

//           <Form.Item label="Name" name="auction_Name">
//             <Input />
//           </Form.Item>

//           <Form.Item label="DepositMoney" name="deposit_Money">
//             <InputNumber />
//           </Form.Item>
//           {/* Hide status field */}
//           <Form.Item label="Status" name="status" style={{ display: "none" }}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Password" name="password">
//             <Input.Password />
//           </Form.Item>

//           {/* <Form.Item
//             label="status"
//             name="status"
//             value={auctionFormData.status}
//           >
//             <Input />
//           </Form.Item> */}

//           <Form.Item>
//             {/* Gắn hành động "Create Auction" vào sự kiện onClick của nút */}
//             <Button
//               type="primary"
//               htmlType="submit"
//               onClick={handleAuctionFormSubmit}
//             >
//               Register Auction
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default MyProductPage;
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
} from "antd";
import moment from "moment";

const { Meta } = Card;

const MyProductPage = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [auctionFormData, setAuctionFormData] = useState({
    product_id: 0,
    startDay: moment().toISOString(),
    auctionDay: moment().toISOString(),
    auction_Name: "",
    deposit_Money: 0,
    status: "",
    password: "",
  });

  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const userId = accountLoggedIn.id;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7022/api/ProductOwner/GetProdcutByProductOwnerId?ownerId=${userId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error appropriately
    }
  };

  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setAuctionFormData({
      ...auctionFormData,
      product_id: product.id,
    });
    handleToggleModal();
  };

  const handleAuctionFormChange = (changedValues) => {
    setAuctionFormData({ ...auctionFormData, ...changedValues });
  };

  const handleAuctionFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:7022/api/Auction/CreateAuction",
        values
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

  return (
    <div className="container">
      <h2 className="mt-4">My Products</h2>
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
              <Button
                type="primary"
                onClick={() => handleProductSelect(product)}
              >
                Register Auction
              </Button>
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
          <Form.Item name="product_id" initialValue={selectedProduct.id} hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Auction Name" name="auction_Name">
            <Input />
          </Form.Item>
          <Form.Item label="Start Day" name="startDay">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="Auction Day" name="auctionDay">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="Deposit Money" name="deposit_Money">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register Auction
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyProductPage;
