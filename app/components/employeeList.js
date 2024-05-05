import React, { useEffect, useState } from 'react';
import EmployeeBox from './employeeBox.js';

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

        data = data.sort((a, b) => a.name.localeCompare(b.name));

        setUsers(data); 
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

	fetchUsers();
  }, []);
  
  // Function to recursively render comments and their replies
  const renderEmployees = (users) => {
    return users.map((user) => (
      <EmployeeBox
        key={user.user_id}
		name={user.name}
        role={user.role}
      />
    ));
  };

  return (
    
      renderEmployees(users)
    
  );
};

export default EmployeeList;