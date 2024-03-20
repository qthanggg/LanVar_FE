import React from 'react';
import './ShoppingPage.css';

const products = [
  {
    "id": 1,
    "isbn": "123456789",
    "product_Name": "Product 1",
    "product_Description": "Description for Product 1",
    "image": "",
    "product_Price": 100,
    "type": "Type 1",
    "status": true
  },
  {
    "id": 2,
    "isbn": "234567890",
    "product_Name": "Product 2",
    "product_Description": "Description for Product 2",
    "image": "",
    "product_Price": 120,
    "type": "Type 2",
    "status": false
  },
  {
    "id": 3,
    "isbn": "345678901",
    "product_Name": "Product 3",
    "product_Description": "Description for Product 3",
    "image": "",
    "product_Price": 80,
    "type": "Type 1",
    "status": true
  },
  {
    "id": 4,
    "isbn": "456789012",
    "product_Name": "Product 4",
    "product_Description": "Description for Product 4",
    "image": "",
    "product_Price": 150,
    "type": "Type 2",
    "status": true
  },
  {
    "id": 5,
    "isbn": "567890123",
    "product_Name": "Product 5",
    "product_Description": "Description for Product 5",
    "image": "",
    "product_Price": 90,
    "type": "Type 1",
    "status": false
  }
];

const ShoppingPage = () => {
  return (
    <div className="shopping-page">
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <div className="product-info">
              <h2>{product.product_Name}</h2>
              <p>{product.product_Description}</p>
              <p>Price: {product.product_Price} VND</p>
              <p>Status: {product.status ? "Available" : "Out of Stock"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingPage;
