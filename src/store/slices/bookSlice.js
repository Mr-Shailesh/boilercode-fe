import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookService } from "../../services/bookService";

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await bookService.getBooks();
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            return rejectWithValue(message);
        }
    }
);

export const addBook = createAsyncThunk(
    "books/addBook",
    async (bookData, { rejectWithValue }) => {
        try {
            const response = await bookService.createBook(bookData);
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            return rejectWithValue(message);
        }
    }
);

export const updateBook = createAsyncThunk(
    "books/updateBook",
    async ({ id, ...bookData }, { rejectWithValue }) => {
        try {
            const response = await bookService.updateBook(id, bookData);
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            return rejectWithValue(message);
        }
    }
);

export const deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (id, { rejectWithValue }) => {
        try {
            await bookService.deleteBook(id);
            return id;
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            return rejectWithValue(message);
        }
    }
);

const initialState = {
    books: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        clearBookError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Books
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Book
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.unshift(action.payload);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Book
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.books.findIndex((book) => book.id === action.payload.id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Book
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.filter((book) => book.id !== action.payload);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearBookError } = bookSlice.actions;
export default bookSlice.reducer;
