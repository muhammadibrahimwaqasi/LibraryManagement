# Library Management System

A full-stack Library Management System using Node.js, Express.js, PostgreSQL (Neon), and React.js.

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Update the DATABASE_URL in .env with your Neon connection string.

4. Run the schema on Neon database:
- Go to Neon Console (https://console.neon.tech)
- Open SQL Editor
- Copy and paste contents of schema.sql
- Execute

5. Start the server:
```bash
npm start
```

The backend server will run on http://localhost:5000

## Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React application:
```bash
npm start
```

The frontend will run on http://localhost:3000

## API Endpoints

### Users
- GET /api/users - Get all users
- POST /api/users - Create user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

### Books
- GET /api/books - Get all books
- GET /api/books/:id - Get book by ID
- POST /api/books - Create book
- PUT /api/books/:id - Update book
- DELETE /api/books/:id - Delete book
- GET /api/books/search?q=term - Search books

### Authors
- GET /api/authors - Get all authors
- POST /api/authors - Create author
- PUT /api/authors/:id - Update author
- DELETE /api/authors/:id - Delete author

### Categories
- GET /api/categories - Get all categories
- POST /api/categories - Create category
- PUT /api/categories/:id - Update category
- DELETE /api/categories/:id - Delete category

### Issues
- GET /api/issues - Get all issued books
- GET /api/issues/active - Get active issues
- POST /api/issues/issue - Issue a book
- POST /api/issues/return - Return a book
- GET /api/issues/fine/:issueId - Calculate fine

### Reservations
- GET /api/reservations - Get all reservations
- POST /api/reservations - Create reservation
- PUT /api/reservations/:id - Update reservation status
- DELETE /api/reservations/:id - Delete reservation

## Features

- Dashboard with statistics
- Full CRUD for books, users, authors, categories
- Book issue and return system
- Late fine calculation
- Book search by title/category
- Reservation system
- Responsive UI

## Database Schema

10 tables:
1. users - Library members
2. authors - Book authors
3. categories - Book categories
4. books - Available books
5. issued_books - Book issues
6. returns - Book returns
7. fines - Late fees
8. librarians - Library staff
9. reservations - Book reservations
10. notifications - User notifications