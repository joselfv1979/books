import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from '../assets/scss/bookSearch.module.scss';
import { useAppDispatch } from '../hooks/redux-hooks';
import { LibraryIcon, SearchIcon } from './Icons';

type Props = {
    query: { search?: string; page: number; };
    setQuery: Dispatch<SetStateAction<{ search?: string; page: number }>>
}

const BookSearch = ({ query, setQuery }: Props) => {

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
        <div className={styles.searchSection}>
            <LibraryIcon />
            <h3 className='text-white mx-2'>Library</h3>
            <div className={styles.bookSearchBar}>
                <button className={styles.bookSearchButton} onClick={handleSearch}><SearchIcon /></button>
                <input
                    type="text"
                    name='search'
                    className={styles.bookSearchInput}
                    placeholder="Search for title, author, genre..."
                    value={query?.search ?? ''}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

export default BookSearch;
