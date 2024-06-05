import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookState } from '../types/Book';
import { RootState } from '.';
import { QueryResponse } from 'types/Query';

const initialBookState: BookState = {
    books: [],
    book: null,
    loading: false,
};

// Reducer functions of book state
export const bookSlice = createSlice({
    name: 'book',
    initialState: initialBookState,
    reducers: {
        setBooksPending: (state) => {
            state.book = null;
            state.loading = true;
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
        setBooksSuccess: (state, action: PayloadAction<QueryResponse>) => {
            state.books = action.payload.books;
            state.currentPage = action.payload.currentPage;
            state.lastPage = action.payload.lastPage;
            state.nextPage = action.payload.nextPage;
            state.totalDocs = action.payload.totalDocs;
            state.totalPages = action.payload.totalPages;
            state.loading = false;
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
        setBookSuccess: (state, action: PayloadAction<Book>) => {
            state.book = action.payload;
            state.loading = false;
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
        setBookFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        createBookSuccess: (state, action: PayloadAction<Book>) => {
            state.books = [...state.books, action.payload];
            state.successMessage = 'Book created successfully';
            state.loading = false;
        },
        createBookFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        eliminateBookSuccess: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter((item: Book) => item.id !== action.payload); // filter out all items with a given value. In this case the action.payload is the id of the product.
            state.successMessage = 'Book deleted successfully';
            state.loading = false;
        },
        eliminateBookFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        modifyBookSuccess: (state, action: PayloadAction<Book>) => {
            state.books = state.books.map((item: Book) =>
                item.id?.toString() === action.payload.id ? action.payload : item,
            );
            // map over the array and if the id matches, replace the item with the new value. In this case the action.payload is the new value
            state.book = action.payload;
            state.successMessage = 'Book updated successfully';
            state.loading = false;
        },
        modifyBookFail: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.loading = false;
        },
        eliminateBookMessage: (state) => {
            state.successMessage = undefined;
            state.errorMessage = undefined;
        },
    },
});

export const storedBook = (state: RootState) => state.book.book;
export const storedProductList = (state: RootState) => state.book.books;
export default bookSlice.reducer;
