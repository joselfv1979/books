import { IBook } from '../../types/Book';
import { Failure, Success } from '../../types/Result';

export enum ActionType {
    RESET_BOOKS = 'RESET_BOOKS',
    GET_BOOKS_PENDING = 'GET_BOOKS_PENDING',
    GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS',
    GET_BOOKS_FAIL = 'GET_BOOKS_FAIL',
    GET_BOOK_PENDING = 'GET_BOOK_PENDING',
    GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS',
    GET_BOOK_FAIL = 'GET_BOOK_FAIL',
    ADD_BOOK_PENDING = 'ADD_BOOK_PENDING',
    ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS',
    ADD_BOOK_FAIL = 'ADD_BOOK_FAIL',
    UPDATE_BOOK_PENDING = 'UPDATE_BOOK_PENDING',
    REMOVE_BOOK_SUCCESS = 'REMOVE_BOOK_SUCCESS',
    REMOVE_BOOK_FAIL = 'REMOVE_BOOK_FAIL',
    UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS',
    UPDATE_BOOK_FAIL = 'UPDATE_BOOK_FAIL',
    REMOVE_BOOK_ERROR = 'REMOVE_BOOK_ERROR',
    REMOVE_BOOK_MESSAGE = 'REMOVE_BOOK_MESSAGE',
}

type bookActionReset = {
    type: ActionType.RESET_BOOKS;
};
type bookActionPending = {
    type:
        | ActionType.GET_BOOKS_PENDING
        | ActionType.GET_BOOK_PENDING
        | ActionType.ADD_BOOK_PENDING
        | ActionType.UPDATE_BOOK_PENDING;
};
type booksActionSuccess = {
    type: ActionType.GET_BOOKS_SUCCESS;
    payload: IBook[];
};

type bookActionSuccess = {
    type:
        | ActionType.GET_BOOK_SUCCESS
        | ActionType.ADD_BOOK_SUCCESS
        | ActionType.REMOVE_BOOK_SUCCESS
        | ActionType.UPDATE_BOOK_SUCCESS;
    payload: Success<IBook>;
};

type bookActionFail = {
    type:
        | ActionType.GET_BOOKS_FAIL
        | ActionType.GET_BOOK_FAIL
        | ActionType.ADD_BOOK_FAIL
        | ActionType.REMOVE_BOOK_FAIL
        | ActionType.UPDATE_BOOK_FAIL;
    payload: Failure;
};

type bookActionMessageCancel = {
    type: ActionType.REMOVE_BOOK_ERROR | ActionType.REMOVE_BOOK_MESSAGE;
};

export type BookAction =
    | bookActionReset
    | bookActionPending
    | booksActionSuccess
    | bookActionSuccess
    | bookActionFail
    | bookActionMessageCancel;
