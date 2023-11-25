import { ActionType, BookAction } from '../actionTypes/book';
import { IBook, initialBook } from '../../types/Book';

export interface BookState {
    books: IBook[];
    book: IBook | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    message?: string;
}

const initialState: BookState = {
    books: [],
    book: initialBook,
    status: 'idle',
    error: null,
};

const bookReducer = (state: BookState = initialState, action: BookAction): BookState => {
    switch (action.type) {
        case ActionType.GET_BOOKS_PENDING:
            return { ...state, books: [], status: 'loading' };
        case ActionType.GET_BOOKS_SUCCESS:
            return {
                ...state,
                books: action.payload,
                status: 'succeeded',
            };
        case ActionType.GET_BOOKS_FAIL:
            return { ...state, books: [], status: 'failed', error: action.payload.message };
        case ActionType.GET_BOOK_PENDING:
            return { ...state, book: null, status: 'loading' };
        case ActionType.GET_BOOK_SUCCESS:
            return {
                ...state,
                book: action.payload.value,
                status: 'succeeded',
            };
        case ActionType.GET_BOOK_FAIL:
            return { ...state, status: 'failed', error: action.payload.message };
        case ActionType.ADD_BOOK_PENDING:
            return { ...state, status: 'loading' };
        case ActionType.ADD_BOOK_SUCCESS:
            return {
                ...state,
                books: [...state.books, action.payload.value],
                status: 'succeeded',
                message: action.payload.message,
            };
        case ActionType.ADD_BOOK_FAIL:
            return { ...state, status: 'failed', error: action.payload.message };
        case ActionType.REMOVE_BOOK_SUCCESS:
            return {
                ...state,
                books: state.books.filter((item: IBook) => item.id !== action.payload.value.id),
                status: 'succeeded',
                message: action.payload.message,
            };

        case ActionType.REMOVE_BOOK_FAIL:
            return {
                ...state,
                books: state.books,
                status: 'failed',
                error: action.payload.message,
            };

        case ActionType.UPDATE_BOOK_SUCCESS:
            return {
                ...state,
                books: state.books.map((item: IBook) =>
                    item.id === action.payload.value.id ? action.payload.value : item,
                ),
                book: action.payload.value,
                message: action.payload.message,
            };

        case ActionType.UPDATE_BOOK_FAIL:
            return { ...state, status: 'failed', error: action.payload.message };

        case ActionType.REMOVE_BOOK_MESSAGE:
            return { ...state, message: undefined };
        case ActionType.REMOVE_BOOK_ERROR:
            return { ...state, error: null };
        case ActionType.RESET_BOOKS:
            return { ...state, status: 'idle' };
        default:
            return state;
    }
};

export default bookReducer;
