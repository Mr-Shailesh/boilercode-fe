import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../store/slices/bookSlice";

export const BookList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            dispatch(deleteBook(id));
        }
    };

    if (loading) return <div>Loading books...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="book-list">
            <h2>Your Books</h2>
            {books.length === 0 ? (
                <p>No books found. Add one to get started!</p>
            ) : (
                <div className="books-grid">
                    {books.map((book) => (
                        <div key={book.id} className="book-card">
                            <h3>{book.title}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Published:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
                            <div className="book-actions">
                                <button onClick={() => onEdit(book)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(book.id)} className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
