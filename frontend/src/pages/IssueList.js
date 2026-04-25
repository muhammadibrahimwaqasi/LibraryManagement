import React, { useState, useEffect } from 'react';
import { getIssues } from '../services/api';

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const data = await getIssues();
      setIssues(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="card">
        <h1>Issued Books History</h1>
        {issues.length === 0 ? (
          <p>No issued books found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Book</th>
                <th>Issue</th>
                <th>Return</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(issues || []).map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.id}</td>
                  <td>{issue.user_name || 'N/A'}</td>
                  <td>{issue.book_title || 'N/A'}</td>
                  <td>{issue.issue_date ? new Date(issue.issue_date).toLocaleDateString() : 'N/A'}</td>
                  <td>{issue.return_date ? new Date(issue.return_date).toLocaleDateString() : 'Not Returned'}</td>
                  <td>{issue.return_date ? <span style={{color:'green'}}>Returned</span> : <span style={{color:'orange'}}>Active</span>}</td>
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

export default IssueList;