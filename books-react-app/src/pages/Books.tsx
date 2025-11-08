import { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { useAppDispatch } from '../hooks/redux-hooks';

interface Query {
    search?: string;
    page: number;
}

// View availability
// Sort by Title, Author by title, Date (latest/earliest first)
const Books = () => {
    const { getBooks } = useAppDispatch();

    const [query, setQuery] = useState<Query>({ page: 1 });

    useEffect(() => {
        getBooks(query)
    }, [query.page]);

    return (
        <BookList query={query} setQuery={setQuery} />
    );
};

export default Books;
