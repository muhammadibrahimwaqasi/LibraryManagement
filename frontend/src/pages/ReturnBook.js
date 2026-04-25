import React, { useState, useEffect } from 'react';
import { getActiveIssues, returnBook as apiReturnBook } from '../services/api';

function ReturnBook() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const data = await getActiveIssues();
      setIssues(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (issueId) => {
    if (!window.confirm('Confirm book return?')) return;
    setLoading(true);
    try {
      await apiReturnBook({ issueId });
      setMessage('Book returned successfully!');
      loadIssues();
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="card">
        <h1>Return Book</h1>
        {message && (
          <div style={{ marginBottom: '20px', padding: '10px', background: message.startsWith('Error') ? '#fadbd8' : '#d5f4e6', borderRadius: '4px' }}>
            {message}
          </div>
        )}
        {issues.length === 0 ? (
          <p>No active issues found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Book</th>
                <th>Issue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(issues || []).map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.id}</td>
                  <td>{issue.user_name || 'N/A'}</td>
                  <td>{issue.book_title || 'N/A'}</td>
                  <td>{issue.issue_date ? new Date(issue.issue_date).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button onClick={() => handleReturn(issue.id)} className="btn btn-success">
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnBook;