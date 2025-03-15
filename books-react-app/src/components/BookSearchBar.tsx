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

    const handleSearch = () => {
        getBooks(query);
    };

    return (
        <div className={styles.bookSearchBar}>
            <button className={styles.bookSearchButton} onClick={handleSearch}><SearchIcon /></button>
            <input type="text" id='search'
                className={styles.bookSearchInput}
                placeholder='Search for title, author, genre, ISBN, publisher'
                value={query?.search ?? ''}
                onChange={handleInputChange} />
        </div>
    );
};

export default BookSearchBar;
