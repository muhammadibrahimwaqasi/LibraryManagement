import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook, searchBooks } from '../services/api';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (search) {
        const data = await searchBooks(search);
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          setBooks([]);
        }
      } else {
        loadBooks();
      }
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        loadBooks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="card">
        <h1>Books</h1>
        <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">Search</button>
          <Link to="/books/add" className="btn btn-success">Add Book</Link>
        </form>
        <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Avail</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(books || []).map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author_name || 'N/A'}</td>
                <td>{book.category_name || 'N/A'}</td>
                <td>{book.available}</td>
                <td>{book.quantity}</td>
                <td>
                  <Link to={`/books/edit/${book.id}`} className="btn btn-primary">Edit</Link>
                  <button onClick={() => handleDelete(book.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default BookList;