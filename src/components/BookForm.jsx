import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../store/slices/bookSlice";

export const BookForm = ({ bookToEdit, onCancel, onSuccess }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publishedDate: "",
    });

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                title: bookToEdit.title,
                author: bookToEdit.author,
                publishedDate: new Date(bookToEdit.publishedDate).toISOString().split("T")[0],
            });
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (bookToEdit) {
                await dispatch(updateBook({ id: bookToEdit.id, ...formData })).unwrap();
            } else {
                await dispatch(addBook(formData)).unwrap();
            }
            setFormData({ title: "", author: "", publishedDate: "" });
            onSuccess();
        } catch (err) {
            console.error("Failed to save book:", err);
        }
    };

    return (
        <div className="book-form-container">
            <h3>{bookToEdit ? "Edit Book" : "Add New Book"}</h3>
            <form onSubmit={handleSubmit} className="book-form">
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
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Published Date</label>
                    <input
                        type="date"
                        name="publishedDate"
                        value={formData.publishedDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        {bookToEdit ? "Update Book" : "Add Book"}
                    </button>
                    {bookToEdit && (
                        <button type="button" onClick={onCancel} className="cancel-btn">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
