import { Dispatch } from 'redux';
import { ActionType, BookAction } from '../actionTypes/book';
import { getAllBooks, getBook, createBook, removeBook, updateBook } from '../../services/books';
import { IBook } from '../../types/Book';
import { validateBook } from '../../utils/validateBook';

export const getBooks = () => {
    return async (dispatch: Dispatch<BookAction>) => {
        dispatch({
            type: ActionType.GET_BOOKS_PENDING,
        });

        const res = await getAllBooks();

        setTimeout(() => {
            res.success
                ? dispatch({
                      type: ActionType.GET_BOOKS_SUCCESS,
                      payload: res.value,
                  })
                : dispatch({
                      type: ActionType.GET_BOOKS_FAIL,
                      payload: res,
                  });
        }, 1000);
    };
};

export const fetchBook = (id: string) => {
    return async (dispatch: Dispatch<BookAction>) => {
        dispatch({
            type: ActionType.GET_BOOK_PENDING,
        });

        const res = await getBook(id);

        setTimeout(() => {
            res.success
                ? dispatch({
                      type: ActionType.GET_BOOK_SUCCESS,
                      payload: res,
                  })
                : dispatch({
                      type: ActionType.GET_BOOK_FAIL,
                      payload: res,
                  });
        }, 1000);
    };
};

export const addBook = (book: FormData) => {
    return async (dispatch: Dispatch<BookAction>) => {
        const validBook = validateBook(book);

        if (!validBook.success) {
            dispatch({
                type: ActionType.ADD_BOOK_FAIL,
                payload: validBook,
            });
            return;
        }
        dispatch({ type: ActionType.ADD_BOOK_PENDING });

        const res = await createBook(book);

        res.success
            ? dispatch({
                  type: ActionType.ADD_BOOK_SUCCESS,
                  payload: res,
              })
            : dispatch({
                  type: ActionType.ADD_BOOK_FAIL,
                  payload: res,
              });
    };
};

export const deleteBook = (book: IBook) => {
    return async (dispatch: Dispatch<BookAction>) => {
        const res = await removeBook(book);

        res.success
            ? dispatch({
                  type: ActionType.REMOVE_BOOK_SUCCESS,
                  payload: res,
              })
            : dispatch({
                  type: ActionType.REMOVE_BOOK_FAIL,
                  payload: res,
              });
    };
};

export const editBook = (book: FormData) => {
    return async (dispatch: Dispatch<BookAction>) => {
        const validBook = validateBook(book);

        if (!validBook.success) {
            dispatch({
                type: ActionType.ADD_BOOK_FAIL,
                payload: validBook,
            });
            return;
        }

        const res = await updateBook(book);

        res.success
            ? dispatch({
                  type: ActionType.UPDATE_BOOK_SUCCESS,
                  payload: res,
              })
            : dispatch({
                  type: ActionType.UPDATE_BOOK_FAIL,
                  payload: res,
              });
    };
};

export const resetBooks = () => {
    return (dispatch: Dispatch<BookAction>) => {
        dispatch({
            type: ActionType.RESET_BOOKS,
        });
    };
};

export const removeBookError = () => {
    return (dispatch: Dispatch<BookAction>) => {
        dispatch({
            type: ActionType.REMOVE_BOOK_ERROR,
        });
    };
};

export const removeBookMessage = () => {
    return (dispatch: Dispatch<BookAction>) => {
        dispatch({
            type: ActionType.REMOVE_BOOK_MESSAGE,
        });
    };
};
