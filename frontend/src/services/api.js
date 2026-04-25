const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  users: `${API_URL}/users`,
  books: `${API_URL}/books`,
  authors: `${API_URL}/authors`,
  categories: `${API_URL}/categories`,
  issues: `${API_URL}/issues`,
  reservations: `${API_URL}/reservations`,
  librarians: `${API_URL}/librarians`,
  notifications: `${API_URL}/notifications`,
  fines: `${API_URL}/fines`,
};

export const getUsers = () => fetch(`${api.users}`).then(res => res.json());
export const createUser = (data) => fetch(`${api.users}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());
export const updateUser = (id, data) => fetch(`${api.users}/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());
export const deleteUser = (id) => fetch(`${api.users}/${id}`, { method: 'DELETE' }).then(res => res.json());

export const getBooks = () => fetch(`${api.books}`).then(res => res.json());
export const getBookById = (id) => fetch(`${api.books}/${id}`).then(res => res.json());
export const createBook = (data) => fetch(`${api.books}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());
export const updateBook = (id, data) => fetch(`${api.books}/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());
export const deleteBook = (id) => fetch(`${api.books}/${id}`, { method: 'DELETE' }).then(res => res.json());
export const searchBooks = (q) => fetch(`${api.books}/search?q=${q}`).then(res => res.json());

export const getAuthors = () => fetch(`${api.authors}`).then(res => res.json());
export const createAuthor = (data) => fetch(`${api.authors}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());

export const getCategories = () => fetch(`${api.categories}`).then(res => res.json());
export const createCategory = (data) => fetch(`${api.categories}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());

export const getIssues = () => fetch(`${api.issues}`).then(res => res.json());
export const getActiveIssues = () => fetch(`${api.issues}/active`).then(res => res.json());
export const issueBook = (data) => fetch(`${api.issues}/issue`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());
export const returnBook = (data) => fetch(`${api.issues}/return`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());

export const getReservations = () => fetch(`${api.reservations}`).then(res => res.json());
export const createReservation = (data) => fetch(`${api.reservations}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());
export const deleteReservation = (id) => fetch(`${api.reservations}/${id}`, { method: 'DELETE' }).then(res => res.json());

export const getLibrarians = () => fetch(`${api.librarians}`).then(res => res.json());
export const createLibrarian = (data) => fetch(`${api.librarians}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());
export const deleteLibrarian = (id) => fetch(`${api.librarians}/${id}`, { method: 'DELETE' }).then(res => res.json());

export const getNotifications = () => fetch(`${api.notifications}`).then(res => res.json());
export const createNotification = (data) => fetch(`${api.notifications}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());
export const markNotificationRead = (id) => fetch(`${api.notifications}/${id}/read`, {
  method: 'PUT',
}).then(res => res.json());
export const deleteNotification = (id) => fetch(`${api.notifications}/${id}`, { method: 'DELETE' }).then(res => res.json());

export const getFines = () => fetch(`${api.fines}`).then(res => res.json());
export const createFine = (data) => fetch(`${api.fines}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => res.json());
export const deleteFine = (id) => fetch(`${api.fines}/${id}`, { method: 'DELETE' }).then(res => res.json());

export default api;