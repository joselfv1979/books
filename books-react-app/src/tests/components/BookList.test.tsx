import BookList from '@/components/BookList';
import { bookState } from '@/tests/utils/data';
import { customRender } from '@/tests/utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { Book } from 'types/Book';

const query = { search: '', page: 1 };
const setQuery = jest.fn();

describe('BookList', () => {

    beforeEach(() => customRender(<BookList query={query} setQuery={setQuery} />,
        { preloadedState: { book: bookState } }));

    it('renders a list of books', () => {
        const header = screen.getByRole('heading');

        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent(/library/i);

        const bookList = screen.getByTestId('book-list');
        expect(bookList).toBeInTheDocument();
    });

    it('BookList should have one book', () => {
        const bookCard = screen.getAllByTestId('book-card');
        expect(bookCard).toHaveLength(1);

        const bookTitle = screen.getByText(/la colmena/i);
        expect(bookTitle).toBeInTheDocument();
    });
})

describe('Empty BookList', () => {

    beforeEach(() => {
        const emptyBookList: Book[] = [];
        const emptyState = { ...bookState, books: emptyBookList }

        customRender(<BookList query={query} setQuery={setQuery} />,
            { preloadedState: { book: emptyState } }
        )
    })

    it('should render no books found text when the list of books is empty', () => {
        const noBooksText = screen.getByText(/no books found/i);
        expect(noBooksText).toBeInTheDocument();
    });
})
