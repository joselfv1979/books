import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, useLocation } from 'react-router-dom';
import BookForm from '../../components/BookForm';
import { store } from '../../store';

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

    it('title should display new book heading', () => {
        const header = screen.getByRole('heading');

        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('New Book');
    });

    it('should display a blank book form', () => {
        const bookForm = screen.getByTestId('book-form');

        const { result } = renderHook(() => useLocation());

        expect(result.current.pathname).toBe('/newBook');

        expect(bookForm).toHaveFormValues({
            title: '',
            author: '',
            publisher: '',
            isbn: '',
            pages: 0,
            genre: ''
        });
    });

    it('should allow entering a title', async () => {
        const inputTitle: HTMLInputElement = screen.getByLabelText('Title');
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
        const inputTitle: HTMLInputElement = screen.getByLabelText('Title');
        const inputAuthor: HTMLInputElement = screen.getByLabelText('Author');
        const inputPrice: HTMLInputElement = screen.getByLabelText('Price');
        const inputPages: HTMLInputElement = screen.getByLabelText('Pages');
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

