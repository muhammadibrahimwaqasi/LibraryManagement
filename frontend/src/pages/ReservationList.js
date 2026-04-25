import React, { useState, useEffect } from 'react';
import { getReservations, createReservation, deleteReservation, getUsers, getBooks } from '../services/api';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ userId: '', bookId: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [resData, usersData, booksData] = await Promise.all([
        getReservations(),
        getUsers(),
        getBooks()
      ]);
      setReservations(Array.isArray(resData) ? resData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
      setBooks(Array.isArray(booksData) ? booksData : []);
    } catch (err) {
      console.error(err);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReservation(formData);
      setFormData({ userId: '', bookId: '' });
      setShowForm(false);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this reservation?')) {
      try {
        await deleteReservation(id);
        loadData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="card">
        <h1>Reservations</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-success" style={{ marginBottom: '20px' }}>
          {showForm ? 'Cancel' : 'Add Reservation'}
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div className="form-group">
              <label>User</label>
              <select name="userId" value={formData.userId} onChange={handleChange} required>
                <option value="">Select User</option>
                {(users || []).map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Book</label>
              <select name="bookId" value={formData.bookId} onChange={handleChange} required>
                <option value="">Select Book</option>
                {(books || []).map((book) => (
                  <option key={book.id} value={book.id}>{book.title}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        )}
        <table>
          <thead>
            <tr><th>ID</th><th>User</th><th>Book</th><th>Action</th></tr>
          </thead>
          <tbody>
            {(reservations || []).map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.user_name || 'N/A'}</td>
                <td>{res.book_title || 'N/A'}</td>
                <td><button onClick={() => handleDelete(res.id)} className="btn btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReservationList;