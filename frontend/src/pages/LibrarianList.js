import React, { useState, useEffect } from 'react';
import { getLibrarians, createLibrarian, deleteLibrarian } from '../services/api';

function LibrarianList() {
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    loadLibrarians();
  }, []);

  const loadLibrarians = async () => {
    try {
      const data = await getLibrarians();
      setLibrarians(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setLibrarians([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createLibrarian(formData);
      setFormData({ name: '' });
      setShowForm(false);
      loadLibrarians();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this librarian?')) {
      try {
        await deleteLibrarian(id);
        loadLibrarians();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="card">
        <h1>Librarians</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-success" style={{ marginBottom: '20px' }}>
          {showForm ? 'Cancel' : 'Add Librarian'}
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ name: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        )}
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Action</th></tr>
            </thead>
            <tbody>
              {(librarians || []).map((lib) => (
                <tr key={lib.id}>
                  <td>{lib.id}</td>
                  <td>{lib.name}</td>
                  <td><button onClick={() => handleDelete(lib.id)} className="btn btn-danger">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      </div>
    </div>
  );
}

export default LibrarianList;