import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, createUser, updateUser } from '../services/api';

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      const users = await getUsers();
      const user = users.find(u => u.id === parseInt(id));
      if (user) {
        setFormData({ name: user.name, email: user.email, role: user.role });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { name: formData.name, email: formData.email, role: formData.role };
      if (id) {
        await updateUser(id, data);
      } else {
        await createUser(data);
      }
      navigate('/users');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="card">
        <h1>{id ? 'Edit User' : 'Add User'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="librarian">Librarian</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate('/users')} className="btn btn-danger" style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;