import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById, createBook, updateBook, getAuthors, getCategories, createAuthor, createCategory } from '../services/api';

function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    authorId: '',
    authorName: '',
    categoryId: '',
    categoryName: '',
    quantity: 1,
  });
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLookups();
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadLookups = async () => {
    try {
      const [authorsData, categoriesData] = await Promise.all([
        getAuthors(),
        getCategories(),
      ]);
      setAuthors(Array.isArray(authorsData) ? authorsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error(err);
      setAuthors([]);
      setCategories([]);
    }
  };

  const loadBook = async () => {
    try {
      const book = await getBookById(id);
      if (book) {
        setFormData({
          title: book.title,
          authorId: book.author_id || '',
          authorName: '',
          categoryId: book.category_id || '',
          categoryName: '',
          quantity: book.quantity,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let authorId = formData.authorId;
      let categoryId = formData.categoryId;

      if (formData.authorName && !authorId) {
        const newAuthor = await createAuthor({ name: formData.authorName });
        authorId = newAuthor.id;
        setAuthors([...authors, newAuthor]);
      }

      if (formData.categoryName && !categoryId) {
        const newCategory = await createCategory({ name: formData.categoryName });
        categoryId = newCategory.id;
        setCategories([...categories, newCategory]);
      }

      const data = {
        title: formData.title,
        authorId: authorId || null,
        categoryId: categoryId || null,
        quantity: formData.quantity,
      };

      if (id) {
        await updateBook(id, data);
      } else {
        await createBook(data);
      }
      navigate('/books');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="card">
        <h1>{id ? 'Edit Book' : 'Add Book'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Author</label>
            <select name="authorId" value={formData.authorId} onChange={handleChange}>
              <option value="">Select Existing Author</option>
              {(authors || []).map((author) => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              placeholder="Or enter new author name"
              style={{ marginTop: '5px' }}
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
              <option value="">Select Existing Category</option>
              {(categories || []).map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Or enter new category name"
              style={{ marginTop: '5px' }}
            />
          </div>
          
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate('/books')} className="btn btn-danger" style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookForm;