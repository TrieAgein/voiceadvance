import { useState, useEffect } from 'react';

function UsersCRUD() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch users
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Add or update a user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, email };
    const method = selectedUserId ? 'PUT' : 'POST';
    const url = selectedUserId ? `/api/user/${selectedUserId}` : '/api/user';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setName('');
      setEmail('');
      setSelectedUserId(null);
      // Refetch users
      fetch('/api/users')
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
  };

  // Select a user to edit
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setSelectedUserId(user.id);
  };

  // Delete a user
  const handleDelete = async (userId) => {
    const response = await fetch(`/api/user/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">{selectedUserId ? 'Update User' : 'Add User'}</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersCRUD;
