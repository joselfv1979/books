import React, { Dispatch, ReactNode, useState } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';
import { useLocation, BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import BookList from '../../components/BookList';
import { Book } from '../../types/Book';
import { store } from '../../store';
import { Query } from 'types/Query';


const books: Book[] = [
    {
        id: '1',
        title: 'La Colmena',
        author: 'Cela',
        publisher: "Penguin",
        isbn: "0-6666-2222",
        genre: ["Horror"],
        pages: 350,
        imagePath: '/',
    },
];

// describe('BookList tests', () => {
//     type Props = {
//         children?: ReactNode;
//     };

//     const wrapper = ({ children }: Props) => (
//         <Provider store={store}>
//             <BrowserRouter>{children}</BrowserRouter>
//         </Provider>
//     );

//     const [query, setQuery] = useState<Query>({ search: 'La casa del Libro', page: '1', limit: '8' });

//     beforeEach(() => {
//         render(<BookList query={query} setQuery={setQuery} />, { wrapper });
//     });

//     it('renders book list', () => {
//         const bookList = screen.getByTestId('book-list');
//         expect(bookList).toBeInTheDocument();
//     });

//     it('renders one book', () => {
//         const bookCard = screen.getAllByTestId('book-card');
//         expect(bookCard).toHaveLength(1);
//     });
// });
