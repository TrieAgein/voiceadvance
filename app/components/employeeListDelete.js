import React, { useEffect, useState } from "react";
import EmployeeBox from "./employeeBox.js";
import "../css/commentBox.css";

const EmployeeList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/get-users`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data); // Add this line to check the structure of fetched data
        data = data.sort((a, b) => a.name.localeCompare(b.name));
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteEmployee = async (userId) => {
    try {
      const response = await fetch(`/api/delete/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Function to render employees with a delete button
  const renderEmployees = (users) => {
    return users.map((user) => {
      // Log the user_id to the console
      console.log("User ID:", user.user_id);
      return (
        <div>
          <EmployeeBox key={user.user_id} name={user.name} role={user.role} />
          <button
            className="toggle-replies-form-button"
            onClick={() => deleteEmployee(user.user_id)}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  return <div>{renderEmployees(users)}</div>;
};

export default EmployeeList;
