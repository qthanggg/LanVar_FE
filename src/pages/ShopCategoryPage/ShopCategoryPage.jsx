import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import { axiosClient } from "src/axios/AxiosClient";

const ShopCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Container>
      {/* <h1 className="mt-4">ShopCategoryPage</h1> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Row xs="1" sm="2" md="3" lg="4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="mb-3">
                <CardBody>
                  <CardTitle tag="h5">{product.product_Name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {product.type}
                  </CardSubtitle>
                  <CardText>{product.product_Description}</CardText>
                  <CardText>Price: ${product.product_Price}</CardText>
                  <CardText>
                    Status: {product.status ? "Active" : "Inactive"}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ShopCategoryPage;
