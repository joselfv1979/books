import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookState } from '../types/Book';
import { QueryResponse } from '../types/Query';

const initialBookState: BookState = {
    books: [],
    book: null,
};

// Reducer functions of book state
export const bookSlice = createSlice({
    name: 'book',
    initialState: initialBookState,
    reducers: {
        setAllBooks: (state, action: PayloadAction<QueryResponse>) => {
            state.books = action.payload.books;
            state.currentPage = action.payload.currentPage;
            state.lastPage = action.payload.lastPage;
            state.nextPage = action.payload.nextPage;
            state.totalDocs = action.payload.totalDocs;
            state.totalPages = action.payload.totalPages;
        },
        setSingleBook: (state, action: PayloadAction<Book>) => {
            state.book = action.payload;
        },
        createBook: (state, action: PayloadAction<Book>) => {
            state.books = [...state.books, action.payload];
        },
        eliminateBook: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter((item: Book) => item.id !== action.payload); // filter out all items with a given value. In this case the action.payload is the id of the product.
        },
        modifyBook: (state, action: PayloadAction<Book>) => {
            state.books = state.books.map((item: Book) =>
                item.id?.toString() === action.payload.id ? action.payload : item,
            );
            // map over the array and if the id matches, replace the item with the new value. In this case the action.payload is the new value
            state.book = action.payload;
        },
        clearCurrentBook: (state) => {
            state.book = null;
        },
    },
});

// export const storedBook = (state: RootState) => state.book.book;
// export const storedProductList = (state: RootState) => state.book.books;
export default bookSlice.reducer;
