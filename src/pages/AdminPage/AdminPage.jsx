import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { axiosClient } from "src/axios/AxiosClient";

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

  return (
    <div>
      {isLoading ? ( // Display loading indicator while fetching data
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
              <th scope="col">status</th>
              {/* Add more headers as needed based on your API data */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id || index}>
                {" "}
                {/* Use a unique key for each row */}
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                {/* Add more table cells as needed based on your API data */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
