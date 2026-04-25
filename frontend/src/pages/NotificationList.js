import React, { useState, useEffect } from 'react';
import { getNotifications, deleteNotification } from '../services/api';

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this notification?')) {
      try {
        await deleteNotification(id);
        loadNotifications();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="card">
        <h1>Notifications</h1>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>ID</th><th>Message</th><th>Action</th></tr>
            </thead>
            <tbody>
              {(notifications || []).map((notif) => (
                <tr key={notif.id}>
                  <td>{notif.id}</td>
                  <td>{notif.message}</td>
                  <td><button onClick={() => handleDelete(notif.id)} className="btn btn-danger">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      </div>
    </div>
  );
}

export default NotificationList;