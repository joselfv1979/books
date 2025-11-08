import { AppThunk } from ".";
import { createBook, getAllBooks, getBook, removeBook, updateBook } from "../services/books";
import { Book } from "../types/Book";
import { Query } from "../types/Query";
import { bookSlice } from "./bookSlice";
import { showNotification } from "./notificationSlice";
import { setLoading } from "./uiSlice";

const { actions } = bookSlice;

// Action to fetch all books
export const getBooks = (params: Query): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));
    // Limit set up to 8 books
    const response = await getAllBooks({ ...params, limit: 8 });

    if (response.success) {
        dispatch(actions.setAllBooks(response.value));
    } else {
        dispatch(showNotification({ type: 'error', message: `Failed to fetch books: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to fetch one book by id
export const fetchBook = (id: string): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await getBook(id);

    if (response.success) {
        dispatch(actions.setSingleBook(response.value));
    } else {
        dispatch(showNotification({ type: 'error', message: `Failed to fetch book: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to create a new book
export const addBook = (book: Book): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await createBook(book);

    if (response.success) {
        dispatch(actions.createBook(response.value));
        dispatch(showNotification({ type: 'success', message: 'Book created successfully' }));
    } else {
        dispatch(showNotification({ type: 'error', message: `Failed to create book: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to delete one product by id,
export const deleteBook = (id: string): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await removeBook(id);

    if (response.success) {
        dispatch(actions.eliminateBook(id));
        dispatch(showNotification({ type: 'success', message: 'Book deleted successfully' }));
    } else {
        dispatch(showNotification({ type: 'error', message: `Failed to delete book: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to update one product by id
export const editBook = (book: Book): AppThunk => async (dispatch) => {

    dispatch(setLoading(true));

    const response = await updateBook(book);

    if (response.success) {
        dispatch(actions.modifyBook(response.value));
        dispatch(showNotification({ type: 'success', message: 'Book updated successfully' }));
    } else {
        dispatch(showNotification({ type: 'error', message: `Failed to update book: ${response.message}` }));
    }

    dispatch(setLoading(false));
};

// Action to clear the current book from the state
export const clearCurrentBook = (): AppThunk => (dispatch) => {
    dispatch(actions.clearCurrentBook());
};

