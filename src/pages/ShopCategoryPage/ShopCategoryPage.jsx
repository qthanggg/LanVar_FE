import React, { useState, useEffect } from "react";
import { Card, Typography, Row, Col, Button } from "antd";
import { axiosClient } from "src/axios/AxiosClient";
import { useDispatch } from "react-redux";
import { addToCart } from "src/app/feature/cart/CartSlice";

const { Meta } = Card;
const { Title, Text } = Typography;

const ShopCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get("/SearchProduct/GetAllProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div style={{ padding: "20px" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.product_Name}
                    src={product.image}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                }
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                actions={[
                  hoveredProductId === product.id && (
                    <Button
                      type="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  ),
                ]}
              >
                <Meta
                  title={<Title level={5}>{product.product_Name}</Title>}
                  description={
                    <>
                      <Text>{product.product_Description}</Text>
                      <br />
                      <Text strong>Price: ${product.product_Price}</Text>
                      <br />
                      <Text type="secondary">
                        Status: {product.status ? "Active" : "Inactive"}
                      </Text>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ShopCategoryPage;
