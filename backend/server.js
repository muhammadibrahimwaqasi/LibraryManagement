const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const issueRoutes = require('./routes/issueRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const librarianRoutes = require('./routes/librarianRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const fineRoutes = require('./routes/fineRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API' });
});

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/librarians', librarianRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/fines', fineRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;