import React, { useState, useEffect } from "react";

import { axiosClient } from "src/axios/AxiosClient";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SlideBarAdmin";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get(
          "/Manage_Manager_Accounts/GetAllUser"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleUserStatus = async (id, currentStatus) => {
    try {
      // Xác định API endpoint dựa trên trạng thái hiện tại của người dùng
      const apiUrl = currentStatus
        ? `/Manage_Manager_Accounts/DeactivateUser/${id}` // Nếu người dùng đang active, gọi API để deactivate
        : `/Manage_Manager_Accounts/ActivateUser/${id}`; // Ngược lại, gọi API để activate

      await axiosClient.put(apiUrl); // Gọi API

      // Cập nhật danh sách người dùng sau khi cập nhật trạng thái thành công
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, status: !currentStatus } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <SidebarAdmin />
          </div>
          <div className="col-md-10">
            {isLoading ? (
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
                    <th scope="col">Actions</th>
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
                          onClick={() =>
                            handleToggleUserStatus(user.id, user.status)
                          }
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
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
