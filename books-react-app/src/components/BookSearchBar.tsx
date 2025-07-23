import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from '../assets/scss/books.module.scss';
import { useAppDispatch } from '../hooks/redux-hooks';
import { SearchIcon } from './Icons';

type Props = {
    query: { search?: string; page: number; };
    setQuery: Dispatch<SetStateAction<{ search?: string; page: number }>>
}

const BookSearchBar = ({ query, setQuery }: Props) => {

    const { getBooks } = useAppDispatch();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery((prevState) => ({ ...prevState, search: event.target.value, page: 1 }))
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            getBooks(query);
        }
    };

    const handleSearch = () => {
        getBooks(query);
    };

    return (
        <div className={styles.bookSearchBar}>
            <button className={styles.bookSearchButton} onClick={handleSearch}><SearchIcon /></button>
            <input
                type="text"
                className={styles.bookSearchInput}
                placeholder="Search for title, author, genre..."
                value={query?.search ?? ''}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default BookSearchBar;
