import { useState } from "react";
import { BookList } from "../components/BookList";
import { BookForm } from "../components/BookForm";
import { Link } from "react-router-dom";
import "./BooksPage.css";

export default function BooksPage() {
    const [editingBook, setEditingBook] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleEdit = (book) => {
        setEditingBook(book);
        setIsFormVisible(true);
    };

    const handleCancel = () => {
        setEditingBook(null);
        setIsFormVisible(false);
    };

    const handleSuccess = () => {
        setEditingBook(null);
        setIsFormVisible(false);
    };

    return (
        <div className="books-page">
            <nav className="books-nav">
                <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
                <h1>Book Management</h1>
                <button
                    className="add-book-btn"
                    onClick={() => {
                        setEditingBook(null);
                        setIsFormVisible(true);
                    }}
                >
                    Add New Book
                </button>
            </nav>

            <main className="books-content">
                {isFormVisible ? (
                    <BookForm
                        bookToEdit={editingBook}
                        onCancel={handleCancel}
                        onSuccess={handleSuccess}
                    />
                ) : (
                    <BookList onEdit={handleEdit} />
                )}
            </main>
        </div>
    );
}
