# Library Management System

Full-stack Library Management System using Node.js, Express.js, PostgreSQL (Neon), and React.js.

## Features

- Dashboard with statistics
- User management (5 roles)
- Book management with search
- Book issue and return system
- Late fine calculation (PKR 500/day)
- Reservations
- Notifications
- Responsive UI

## Tech Stack

**Backend:** Node.js, Express.js, PostgreSQL (Neon), pg package
**Frontend:** React.js, React Router DOM

## Database (10 Tables)

1. users - Library members
2. authors - Book authors
3. categories - Book categories
4. books - Available books
5. issued_books - Book issues
6. returns - Book returns
7. fines - Late fees
8. librarians - Library staff
9. reservations - Book reservations
10. notifications - Messages

## Setup

### Backend

```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:5000

### Frontend

```bash
cd frontend
npm install
npm start
```
App runs on http://localhost:3000

## API Endpoints

| Endpoint | Methods |
|----------|---------|
| /api/users | GET, POST, PUT, DELETE |
| /api/books | GET, POST, PUT, DELETE, GET /search |
| /api/authors | GET, POST, PUT, DELETE |
| /api/categories | GET, POST, PUT, DELETE |
| /api/issues | GET, GET /active, POST /issue, POST /return |
| /api/reservations | GET, POST, DELETE |
| /api/librarians | GET, POST, PUT, DELETE |
| /api/notifications | GET, POST, DELETE |
| /api/fines | GET, POST, DELETE |

## Pages

| Route | Page | Description |
|-------|------|-------------|
| / | Dashboard | Statistics |
| /books | BookList | All books |
| /books/add | BookForm | Add book |
| /users | UserList | All users |
| /users/add | UserForm | Add user |
| /issue | IssueBook | Issue book |
| /return | ReturnBook | Return book |
| /issues | IssueList | Issue history |
| /librarians | LibrarianList | Librarians |
| /notifications | NotificationList | Notifications |
| /reservations | ReservationList | Reservations |
| /fines | FineList | Fines |

## User Roles

- user (default)
- student
- admin
- librarian
- teacher

## Business Rules

- Book can only be issued if available > 0
- Due date = 14 days from issue
- Late fine = PKR 500 per day
- Email must be unique