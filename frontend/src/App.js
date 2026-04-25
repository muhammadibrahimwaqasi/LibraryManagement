import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import IssueBook from './pages/IssueBook';
import ReturnBook from './pages/ReturnBook';
import IssueList from './pages/IssueList';
import LibrarianList from './pages/LibrarianList';
import NotificationList from './pages/NotificationList';
import ReservationList from './pages/ReservationList';
import FineList from './pages/FineList';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h2>Library Management</h2>
          <div>
            <Link to="/">Dashboard</Link>
            <Link to="/books">Books</Link>
            <Link to="/users">Users</Link>
            <Link to="/librarians">Librarians</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/reservations">Reservations</Link>
            <Link to="/fines">Fines</Link>
            <Link to="/issue">Issue Book</Link>
            <Link to="/return">Return Book</Link>
            <Link to="/issues">Issued Books</Link>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/add" element={<BookForm />} />
            <Route path="/books/edit/:id" element={<BookForm />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/add" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="/librarians" element={<LibrarianList />} />
            <Route path="/notifications" element={<NotificationList />} />
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/fines" element={<FineList />} />
            <Route path="/issue" element={<IssueBook />} />
            <Route path="/return" element={<ReturnBook />} />
            <Route path="/issues" element={<IssueList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;