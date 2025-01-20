import React, { useState, useEffect } from "react";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from '../apiService';
import styles from './BookList.module.css'

function BookList() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBook(editingId, formData);
        setEditingId(null);
      } else {
        await addBook({...formData});
      }
      setFormData({ title: "", author: "" });
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditingId(book.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <span>
              {book.title} by {book.author}
            </span>
            <div>
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;