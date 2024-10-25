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

    const setButtons = useLocation().pathname === '/books';

    const image = book.imagePath ? `${baseUrl}/${book.imagePath}` : defaultImage;

    return (
        <Card className={styles.bookCard} data-testid={book.title}>
            <Card.Img src={image} variant='top' className={styles.bookImage} />
            <Card.Header>{book.author}</Card.Header>
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card content.
                </Card.Text>
                {setButtons && <BookCardButtons book={book} />}
            </Card.Body>
        </Card>
    );
};

export default BookCard;