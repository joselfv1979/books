import React, { ReactNode } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';
import { useLocation, BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import userEvent from '@testing-library/user-event';
import BookForm from '../../components/BookForm';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: '/newBook',
    }),
}));

const saveBook = jest.fn();

const onChange = jest.fn();

describe('BookForm tests', () => {
    type Props = {
        children?: ReactNode;
    };

    const wrapper = ({ children }: Props) => (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    );
    beforeEach(() => {
        render(<BookForm saveBook={saveBook} />, { wrapper });
    });

    it('renders book form', () => {
        const bookForm = screen.getByTestId('book-form');

        expect(bookForm).toBeInTheDocument();
    });

    it('title should display register', () => {
        const header = screen.getByRole('heading');

        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('New Book');
    });

    it('should display a blank user form', () => {
        const bookForm = screen.getByTestId('book-form');

        const { result } = renderHook(() => useLocation());

        expect(result.current.pathname).toBe('/newBook');

        expect(bookForm).toHaveFormValues({
            title: '',
            author: '',
            price: null,
            pages: null,
        });
    });

    it('should allow entering a title', async () => {
        const inputTitle = screen.getByLabelText('Title') as HTMLInputElement;
        expect(inputTitle).toBeInTheDocument();

        inputTitle.onchange = onChange;

        // userEvent.type(inputTitle, 'Muhammad Lahin');

        fireEvent.change(inputTitle, { target: { value: 'Muhammad Lahin' } });
        console.log('TITLE:::', inputTitle.value);

        //    expect(onChange).toHaveBeenCalledWith('Muhammad Lahin');
        expect(inputTitle.value).toBe('Muhammad Lahin');
        expect(onChange).toHaveBeenCalled();
    });

    it('calls login function with typed values', () => {
        const inputTitle = screen.getByLabelText('Title') as HTMLInputElement;
        const inputAuthor = screen.getByLabelText('Author') as HTMLInputElement;
        const inputPrice = screen.getByLabelText('Price') as HTMLInputElement;
        const inputPages = screen.getByLabelText('Pages') as HTMLInputElement;
        userEvent.type(inputTitle, 'Caperucita Roja');
        userEvent.type(inputAuthor, 'jose');
        userEvent.type(inputPrice, '12');
        userEvent.type(inputPages, '123');

        const submitButton = screen.getByRole('button', { name: 'Submit' });

        userEvent.click(submitButton);

        // expect(saveBook).toHaveBeenCalledWith({
        //     title: 'Caperucita Roja',
        //     author: 'jose',
        //     price: '12',
        //     pages: '123',
        // });
    });
});
