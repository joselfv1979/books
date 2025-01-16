import { Card } from 'react-bootstrap';
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
        <Card className={styles.bookCard} data-testid={book.title}>
            <div className={styles.frame}>
                <Card.Img src={image} variant='top' className={styles.bookImage} />
            </div>
            <Card.Header>{book.author}</Card.Header>
            <Card.Body className={styles.body}>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text className={styles.textEllipsis}>{book.description ?? staticText}</Card.Text>
                {showButtons && <BookCardButtons bookId={book.id} />}
            </Card.Body>
        </Card>
    );
};

export default BookCard;