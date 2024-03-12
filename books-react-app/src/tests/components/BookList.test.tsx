import React, { Dispatch, ReactNode } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';
import { useLocation, BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import BookList from '../../components/BookList';
import { Book } from '../../types/Book';
import { store } from '../../store';


const books: Book[] = [
    {
        id: '1',
        title: 'La Colmena',
        author: 'Cela',
        price: 20,
        pages: 350,
        imagePath: '/',
    },
];

describe('BookList tests', () => {
    type Props = {
        children?: ReactNode;
    };

    const wrapper = ({ children }: Props) => (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    );
    beforeEach(() => {
        render(<BookList />, { wrapper });
    });

    it('renders book list', () => {
        const bookList = screen.getByTestId('book-list');
        expect(bookList).toBeInTheDocument();
    });

    it('renders one book', () => {
        const bookCard = screen.getAllByTestId('book-card');
        expect(bookCard).toHaveLength(1);
    });
});
