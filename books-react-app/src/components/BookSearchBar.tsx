import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch } from '../hooks/redux-hooks';
import { LibraryIcon, SearchIcon } from './Icons';
import Button from './ui/Button';

// type Props = {
//     query: { search?: string; page: number; };
//     setQuery: Dispatch<SetStateAction<{ search?: string; page: number }>>
// }

type QueryState = { search?: string; page: number };

interface Props {
    query: QueryState;
    setQuery: Dispatch<SetStateAction<QueryState>>;
}

const BookSearchBar = ({ query, setQuery }: Props) => {

    const { getBooks } = useAppDispatch();
    const [localValue, setLocalValue] = useState(query.search ?? "");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery((prevState) => ({ ...prevState, search: event.target.value, page: 1 }))
    };

    const commitSearch = () => {
        setQuery(prev => ({ ...prev, search: localValue.trim() || undefined, page: 1 }));
        getBooks({ ...query, search: localValue.trim() || undefined, page: 1 });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") commitSearch();
    };

    const clearSearch = () => {
        setLocalValue("");
        setQuery(prev => ({ ...prev, search: undefined, page: 1 }));
        getBooks({ ...query, search: undefined, page: 1 });
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-brand-700 text-white rounded-lg p-3 shadow">
                <LibraryIcon className="w-6 h-6" />
                <h3 className="text-sm font-medium m-0">Library</h3>
                <div className="flex-1 flex items-center gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search title, author, genre..."
                            value={localValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white text-brand-900 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                        />
                        {localValue && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-600 hover:text-brand-800 text-xs"
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={commitSearch}
                        className="shrink-0 px-3 py-2"
                    >
                        <span className="flex items-center gap-1">
                            <SearchIcon className="w-4 h-4" /> Search
                        </span>
                    </Button>
                </div>
            </div>
            {query.search && (
                <p className="text-[11px] text-brand-700">
                    Active filter: <span className="font-medium">{query.search}</span>
                </p>
            )}
        </div>
    );

    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         getBooks(query);
    //     }
    // };

    // const handleSearch = () => {
    //     getBooks(query);
    // };

    // return (
    //     <div className={styles.searchSection}>
    //         <LibraryIcon />
    //         <h3 className='text-white mb-0 mx-2'>Library</h3>
    //         <div className={styles.bookSearchBar}>
    //             <button className={styles.bookSearchButton} onClick={handleSearch}><SearchIcon /></button>
    //             <input
    //                 type="text"
    //                 name='search'
    //                 className={styles.bookSearchInput}
    //                 placeholder="Search for title, author, genre..."
    //                 value={query?.search ?? ''}
    //                 onChange={handleInputChange}
    //                 onKeyDown={handleKeyDown}
    //             />
    //         </div>
    //     </div>
    // );
};

export default BookSearchBar;
