import { useLocation } from 'react-router-dom';
import defaultImage from '../assets/images/library.jpg';
import { Book } from '../types/Book';
import BookCardButtons from './BookCardButtons';

const baseUrl = import.meta.env.VITE_API_URL;

type Props = {
    book: Book;
    styles: { readonly [key: string]: string };
};

const BookCard = ({ book, styles }: Props) => {

    const { pathname } = useLocation();
    const showButtons = pathname === '/books';

    const image = book.imagePath ? `${baseUrl}/${book.imagePath}` : defaultImage;

    const staticText = 'Some quick example text to build on the card title and make up the bulk of the card content.';

    return (
        <div className="card h-100">
            <img src={image}
                className="card-img-top"
                alt={`Portada de ${book.title}`}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{book.title}</h5>
                <h5 className="card-subtitle my-2 text-muted">{book.author}</h5>
                <p className={styles.textEllipsis}>{book.description ?? staticText}</p>
                <div className={styles.buttonGroup}>
                    {showButtons && <BookCardButtons bookId={book.id} />}
                </div>
            </div>
        </div>
    );
};

export default BookCard;