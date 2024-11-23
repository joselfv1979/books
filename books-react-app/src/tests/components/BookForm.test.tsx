import { fireEvent, renderHook } from '@testing-library/react';
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
const handleChange = vi.fn();
global.URL.createObjectURL = vi.fn();

const user = userEvent.setup();

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

        inputTitle.onchange = handleChange;
        fireEvent.change(inputTitle, { target: { value: 'Muhammad Lahin' } });

        expect(inputTitle.value).toBe('Muhammad Lahin');

        expect(handleChange).toHaveBeenCalled();
    });

    test('shows error messages for invalid inputs', async () => {

        await user.click(screen.getByText(/Submit/i));

        expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Author is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Publisher is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Isbn is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Pages is required/i)).toBeInTheDocument();
    });

    it('calls addBook function when the form is submitted', async () => {

        await user.type(screen.getByLabelText(/Enter title/i), 'Test Title');
        await user.type(screen.getByLabelText(/Enter author/i), 'Test Author');
        await user.type(screen.getByLabelText(/Enter publisher/i), 'Test Publisher');
        await user.type(screen.getByLabelText(/Enter isbn/i), '123-456-789');
        await user.type(screen.getByLabelText(/Enter pages/i), '300');

        await user.click(screen.getByText(/Submit/i));

        expect(addBook).toHaveBeenCalledWith({
            id: "",
            title: 'Test Title',
            author: 'Test Author',
            publisher: 'Test Publisher',
            isbn: '123-456-789',
            pages: "300",
            image: undefined,
            imagePath: "",
            genre: []
        });
    });

    it('should allow uploading a file', async () => {

        const inputFile: HTMLInputElement = screen.getByLabelText(/photo/i);

        expect(inputFile).toBeInTheDocument();
        const file = new File(['test file content'], 'test.jpg', {
            type: 'image/jpeg',
        });

        await user.upload(inputFile, file);

        expect(inputFile.files).toContain(file);
    });

    it('should navigate to book list page on cliking on cancel button', async () => {
        const cancelButton = screen.getByRole('button', { name: /cancel/i });

        await user.click(cancelButton);

        expect(mockNavigate).toHaveBeenCalledWith("/books");
    })
});

