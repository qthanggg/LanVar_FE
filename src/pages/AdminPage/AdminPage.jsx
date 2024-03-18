import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { axiosClient } from "src/axios/AxiosClient";
import HeaderAdmin from "./HeaderAdmin";

const AdminPage = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await axiosClient.get(
          "/Manage_Manager_Accounts/GetAllUser"
        );
        setUsers(response.data); // Update user state with fetched data
      } catch (error) {
        console.error("Error fetching users:", error); // Handle errors gracefully
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers(); // Call the function on component mount
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleToggleUserStatus = async (id, currentStatus) => {
    try {
      // Gọi API để cập nhật trạng thái của người dùng
      const newStatus = !currentStatus; // Chuyển đổi trạng thái
      await axiosClient.put(`/Manage_Manager_Accounts/ActivateUser/${id}`, {
        status: newStatus,
      });
      // Cập nhật danh sách người dùng sau khi cập nhật trạng thái thành công
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error toggling user status:", error); // Xử lý lỗi nếu cần
    }
  };

  return (
    <div>
      <HeaderAdmin />
      {isLoading ? ( // Hiển thị biểu tượng tải khi đang tải dữ liệu
        <p>Loading users...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Gender</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th> {/* Thêm tiêu đề cột mới */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id || index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.status ? "Active" : "Deactive"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleToggleUserStatus(user.id, user.status)}
                  >
                    {user.status ? "Deactive" : "Active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
