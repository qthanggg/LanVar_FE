import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post(
        "/ProductOwner/CreateProduct",
        formData
      );
      console.log("Product created:", response.data);
      toast("Create Success");
      // Add any further logic here, e.g., redirecting to another page, showing a success message, etc.
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="container col-md-4">
      <h2 className="mt-4">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            className="form-control"
            id="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            type="hidden"
            name="user_id"
            className="form-control"
            id="userId"
            placeholder="User ID"
            value={formData.user_id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            name="product_Name"
            className="form-control"
            id="productName"
            placeholder="Product Name"
            value={formData.product_Name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Product Description
          </label>
          <input
            type="text"
            name="product_Description"
            className="form-control"
            id="productDescription"
            placeholder="Product Description"
            value={formData.product_Description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageURL" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            className="form-control"
            id="imageURL"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Product Price
          </label>
          <input
            type="number"
            name="product_Price"
            className="form-control"
            id="productPrice"
            placeholder="Product Price"
            value={formData.product_Price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            name="type"
            className="form-control"
            id="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            name="status"
            className="form-check-input"
            id="status"
            checked={formData.status}
            onChange={handleChange}
          />
          <label htmlFor="status" className="form-check-label">
            Status
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductOwnerPage;
