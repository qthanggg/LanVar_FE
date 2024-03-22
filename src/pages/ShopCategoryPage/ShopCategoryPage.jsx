import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Row, Col } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const ShopCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null); // State để theo dõi id của sản phẩm đang được hover
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const userId = accountLoggedIn.id;
  const token = localStorage.getItem("token"); // Lấy token từ LocalStorage

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://localhost:7022/api/SearchProduct/GetAllProducts",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]); // Thêm token vào dependency array để fetch lại dữ liệu khi token thay đổi

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(
        "https://localhost:7022/api/OrderItem/AddProductToOrderItem",
        {
          product_id: productId,
          user_id: userId,
          isSelected: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Product added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Shop Category Page
      </h1>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <div
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                  }}
                >
                  <img
                    alt={product.product_Name}
                    src={product.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {hoveredProductId === product.id && (
                    <Button
                      type="primary"
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              }
            >
              <Title level={4} style={{ marginBottom: "10px" }}>
                {product.product_Name}
              </Title>
              <Text style={{ fontSize: "14px", color: "#888" }}>
                {product.product_Description}
              </Text>
              <br />
              <Text strong style={{ fontSize: "16px" }}>
                Price: ${product.product_Price}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopCategoryPage;
