import { AppThunk } from ".";
import { createBook, getAllBooks, getBook, removeBook, updateBook } from "../services/books";
import { validateBook } from "../utils/validateBook";
import { bookSlice } from "./bookSlice";

const { actions } = bookSlice;

// Action to fetch all books
export const getBooks = (): AppThunk => async (dispatch) => {
    dispatch(actions.setBooksPending());

    const response = await getAllBooks();
    response.success
        ? dispatch(actions.setBooksSuccess(response.value))
        : dispatch(actions.setBookFail(response.message));
};

// Action to fetch one book by id
export const fetchBook = (id: string): AppThunk =>
    async (dispatch) => {
        dispatch(actions.setBooksPending());

        const response = await getBook(id);
        response.success
            ? dispatch(actions.setBookSuccess(response.value))
            : dispatch(actions.setBookFail(response.message));
    };

// Action to create a new book
export const addBook = (book: FormData): AppThunk =>
    async (dispatch) => {
        dispatch(actions.setBooksPending());

        const validBook = validateBook(book);
        if (!validBook.success) {
            dispatch(actions.createBookFail(validBook.message));
            return;
        }

        const response = await createBook(book);
        response.success
            ? dispatch(actions.createBookSuccess(response.value))
            : dispatch(actions.createBookFail(response.message));
    };

// Action to delete one product by id,
export const deleteBook = (id: string): AppThunk =>
    async (dispatch) => {
        dispatch(actions.setBooksPending());

        const response = await removeBook(id);
        response.success
            ? dispatch(actions.eliminateBookSuccess(id))
            : dispatch(actions.eliminateBookFail(response.message));
    };

// Action to update one product by id
export const editBook = (book: FormData): AppThunk =>
    async (dispatch) => {
        dispatch(actions.setBooksPending());

        const validBook = validateBook(book);
        if (!validBook.success) {
            dispatch(actions.modifyBookFail(validBook.message));
            return;
        }

        const response = await updateBook(book);
        response.success
            ? dispatch(actions.modifyBookSuccess(response.value))
            : dispatch(actions.modifyBookFail(response.message));
    };

// Action to remove any message from ProductState
export const removeBookMessage = (): AppThunk => async (dispatch) => {
    setTimeout(() => dispatch(actions.eliminateBookMessage()), 3000);
};
