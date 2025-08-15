import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import defaultImage from '../assets/images/library.jpg';
import styles from '../assets/scss/book.module.scss';
import BookSearchBar from '../components/BookSearch';
import { Loader } from '../components/Loader';
import Message from '../components/Message';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getMessage } from '../utils/handleMessage';

const baseUrl = import.meta.env.VITE_API_URL;

// Summary, Record details, Tags, Reviews, Titles by this author
interface Query {
    search?: string;
    page: number;
}

const Book = () => {
    const { id } = useParams();

    const { fetchBook } = useAppDispatch();
    const { book, loading, errorMessage, successMessage } = useAppSelector((state) => state.book);
    const message = getMessage(errorMessage, successMessage);

    const [query, setQuery] = useState<Query>({ page: 1 });
    const image = book?.imagePath ? `${baseUrl}/${book.imagePath}` : defaultImage;

    useEffect(() => {
        if (id) fetchBook(id);
    }, [id]);

    return (
        loading ? <Loader />
            : <>
                {message && <Message message={message} />}

                <BookSearchBar query={query} setQuery={setQuery} />
                <div style={{ height: '50px', backgroundColor: '#003366' }}>
                    <nav aria-label="breadcrumb" className={styles.breadcrumb}>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Library</li>
                        </ol>
                    </nav>
                </div>

                {book && <div className={styles.bookDraft}>
                    <div className="h-50">
                        <img src={image}
                            className={styles.imgThumbnail}
                            alt={`Portada de ${book.title}`}
                        />
                    </div>
                    <div className={styles.cardText}>
                        <h5 className="card-title">{book.title}</h5>
                        <h5 className="card-subtitle my-2 text-muted">{book.author}</h5>
                    </div>
                </div>}
            </>
    );
};

export default Book;
