import React, { useState, useEffect } from 'react';
import { getBooks, getUsers, getIssues, getActiveIssues } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({ books: 0, users: 0, issues: 0, active: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const books = await getBooks();
      const users = await getUsers();
      const issues = await getIssues();
      const active = await getActiveIssues();
      setStats({
        books: Array.isArray(books) ? books.length : 0,
        users: Array.isArray(users) ? users.length : 0,
        issues: Array.isArray(issues) ? issues.length : 0,
        active: Array.isArray(active) ? active.length : 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p>{stats.books}</p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="stat-card">
          <h3>Total Issues</h3>
          <p>{stats.issues}</p>
        </div>
        <div className="stat-card">
          <h3>Active Issues</h3>
          <p>{stats.active}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;