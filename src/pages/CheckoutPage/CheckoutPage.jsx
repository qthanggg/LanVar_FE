import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";
import { BannerPath } from "src/components";

const CheckoutPage = () => {
  // Nhận dữ liệu đã chọn từ state của React Router
  const location = useLocation();
  const { productsToCheckout } = location.state;

  // Render danh sách sản phẩm đã chọn
  const renderProductsToCheckout = () => {
    return productsToCheckout.map((product) => (
      <tr key={product.id}>
        <td>
          <img
            src={product.image}
            alt={product.name}
            width={150}
            height={100}
          />
        </td>
        <td>{product.name}</td>
        <td>{product.product_Description}</td>
        <td>${product.price}</td>
      </tr>
    ));
  };

  return (
    <>
      <BannerPath title="Checkout Page" path="Home - Checkout Page" />
      <Container className="cart-area">
        <Table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{renderProductsToCheckout()}</tbody>
        </Table>
        <Button color="primary" className="cart-area__btn-purchase">
          Purchase
        </Button>
      </Container>
    </>
  );
};

export default CheckoutPage;
