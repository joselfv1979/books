import { useAppDispatch } from 'hooks/redux-hooks';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

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
        <div className='d-flex w-50 mx-auto mt-2'>
            <input type="text" id='search' className="form-control mx-2" placeholder='Search for title, author, genre, ISBN, publisher' value={query?.search ?? ''} onChange={handleInputChange} />
            <button type="submit" className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
    );
};

export default BookSearchBar;