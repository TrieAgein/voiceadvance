import React, { useState } from 'react';
import '../css/createUser.css';  // Assuming the CSS is saved in this file similar to your comment form.

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload

        // Prepare the payload based on your API's expected schema
        const payload = {
            name,
            email,
            password,
            role
        };

        try {
            // Make the POST request to your API endpoint for user registration
            const response = await fetch('/api/create-user', { // Adjust this API endpoint as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorBody = await response.text();  // or response.json() if the server sends JSON
                throw new Error(`HTTP error! status: ${response.status}, Body: ${errorBody}`);
            }

            const data = await response.json();
            console.log('User created successfully:', data);
            // Clear the form fields after successful submission
            setName('');
            setEmail('');
            setPassword('');
            setRole(' ')
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-submit-form">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
            />
            <select className="form-input" type="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Employee">Employee</option>
                <option value="Resolver">Resolver</option>
            </select>
            
            <br/>
            <button type="submit" className="submit-button">Create User</button>
        </form>
    );
};

export default CreateUser;
