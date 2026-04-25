import React, { useState, useEffect } from 'react';
import { getFines, deleteFine } from '../services/api';

function FineList() {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFines();
  }, []);

  const loadFines = async () => {
    try {
      const data = await getFines();
      setFines(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setFines([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this fine?')) {
      try {
        await deleteFine(id);
        loadFines();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="card">
        <h1>Fines</h1>
        {fines.length === 0 ? (
          <p>No fines found.</p>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>User</th><th>Amount</th><th>Action</th></tr>
            </thead>
            <tbody>
              {(fines || []).map((fine) => (
                <tr key={fine.id}>
                  <td>{fine.id}</td>
                  <td>{fine.user_name || 'N/A'}</td>
                  <td>PKR {parseFloat(fine.amount || 0).toFixed(2)}</td>
                  <td><button onClick={() => handleDelete(fine.id)} className="btn btn-danger">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FineList;