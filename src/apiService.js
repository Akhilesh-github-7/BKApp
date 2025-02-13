import axios from 'axios';

const API_URL = "https://bkserver-3umz.onrender.com";

export const getBooks = () => axios.get(API_URL);
export const getBookById = (id) => axios.get(`${API_URL}/${id}`);
export const addBook = (book) => axios.post(API_URL, book);
export const updateBook = (id, updatedBook) => axios.put(`${API_URL}/${id}, updatedBook`);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);