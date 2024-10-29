import { fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useLocation } from 'react-router-dom';
import { vi } from 'vitest';
import BookForm from '../../components/BookForm';
import { initialBook } from '../../data/ConstantUtils';
import { customRender, screen } from '../utils/test-utils';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useLocation: () => ({
            pathname: '/newBook',
        }),
        useNavigate: () => mockNavigate
    };
});

const addBook = vi.fn();
const onChange = vi.fn();

describe('BookForm', () => {

    beforeEach(() => customRender(<BookForm book={initialBook} saveBook={addBook} editing={false} />));

    it('renders book form', () => {
        const bookForm = screen.getByTestId('book-form');

        expect(bookForm).toBeInTheDocument();
    });

    it('title should display new book heading', () => {
        const header = screen.getByRole('heading');

        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent(/new book/i);
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
        const inputTitle: HTMLInputElement = screen.getByPlaceholderText(/enter title/i);
        expect(inputTitle).toBeInTheDocument();

        inputTitle.onchange = onChange;
        fireEvent.change(inputTitle, { target: { value: 'Muhammad Lahin' } });

        expect(inputTitle.value).toBe('Muhammad Lahin');

        expect(onChange).toHaveBeenCalled();
    });

    it('calls addBook function when the form is submitted', () => {

        userEvent.type(screen.getByPlaceholderText(/enter title/i), 'Caperucita Roja');
        userEvent.type(screen.getByPlaceholderText(/enter author/i), 'Jose Coronado');
        userEvent.type(screen.getByPlaceholderText(/enter publisher/i), 'Random Editorial');
        userEvent.type(screen.getByPlaceholderText(/enter isbn/i), '123-3456-23');
        userEvent.type(screen.getByPlaceholderText(/enter pages/i), '123');

        const submitButton = screen.getByRole('button', { name: /submit/i });
        userEvent.click(submitButton);

        expect(addBook).toHaveBeenCalledWith({
            title: 'Caperucita Roja',
            author: 'Jose Coronado',
            publisher: 'Random Editorial',
            isbn: '123-3456-23',
            pages: '0123',
            imagePath: '',
            genre: [],
            image: undefined,
            id: ''
        });
    });

    it.skip('should display inputFile and preview image', async () => {

        const inputFile = screen.getByLabelText(/photo/i);

        expect(inputFile).toBeInTheDocument();
        const file = new File(['test file content'], 'test.jpg', {
            type: 'image/jpeg',
        });

        fireEvent.change(inputFile, { target: { files: [file] } })

        await waitFor(() => expect(screen.getByAltText(/preview/i)).toBeInTheDocument());
    });

    it('should navigate to book list page on cliking on cancel button', () => {
        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        userEvent.click(cancelButton);

        expect(mockNavigate).toHaveBeenCalledWith("/books");
    })
});

