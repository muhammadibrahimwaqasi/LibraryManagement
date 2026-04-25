import React, { useState, useEffect } from 'react';
import { getUsers, getBooks, issueBook as apiIssueBook } from '../services/api';

function IssueBook() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ userId: '', bookId: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, booksData] = await Promise.all([getUsers(), getBooks()]);
      const validUsers = Array.isArray(usersData) ? usersData : [];
      const validBooks = Array.isArray(booksData) ? booksData : [];
      setUsers(validUsers);
      setBooks(validBooks.filter((b) => b.available > 0));
    } catch (err) {
      console.error(err);
      setUsers([]);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.bookId) {
      setMessage('Please select both user and book');
      return;
    }
    setLoading(true);
    try {
      await apiIssueBook(formData);
      setMessage('Book issued successfully!');
      setFormData({ userId: '', bookId: '' });
      loadData();
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="card">
        <h1>Issue Book</h1>
        {message && (
          <div className={message.startsWith('Error') ? 'error' : 'success'} style={{ marginBottom: '20px', padding: '10px', background: message.startsWith('Error') ? '#fadbd8' : '#d5f4e6', borderRadius: '4px' }}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User</label>
            <select name="userId" value={formData.userId} onChange={handleChange} required>
              <option value="">Select User</option>
              {(users || []).map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Book</label>
            <select name="bookId" value={formData.bookId} onChange={handleChange} required>
              <option value="">Select Book</option>
              {(books || []).map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} - Available: {book.available}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success">
            Issue Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default IssueBook;