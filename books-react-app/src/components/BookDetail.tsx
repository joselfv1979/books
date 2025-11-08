/* Book details */
import React from 'react';
import fallbackImage from '../assets/images/fallback.svg';
import styles from '../assets/scss/book.module.scss';
import { useAppSelector } from '../hooks/redux-hooks';
import { getNotification } from '../store/notificationSlice';
import { Book } from '../types/Book';

const baseUrl = import.meta.env.VITE_API_URL;

type Props = {
    book: Book | null;
    handleLoan: () => void;
};

// TODO: Refactor to smaller components
// Create view for listing user's loans and returns

const BookDetail: React.FC<Props> = ({ book, handleLoan }) => {

    const notification = useAppSelector(getNotification);

    if (!book) return <h2>No book found</h2>;

    const image = book.imagePath ? `${baseUrl}/${book.imagePath}` : fallbackImage;
    const labels = ['Title', 'Author', 'ISBN', 'Language', 'Pages', 'Published', 'Subject'];
    const values = [book.title, book.author, book.isbn, book.language, book.pages, book.publishedYear, book.genre];

    return (
        <>
            <div className={styles.bookDraftContainer}>
                {/* Book image & details */}
                <img src={image}
                    className={styles.imgThumbnail}
                    alt={`Portada de ${book.title}`}
                    loading="lazy"
                />
                <div className={styles.cardText}>
                    <h4 className="card-title">{book.title}</h4>
                    <h5 className="card-subtitle my-2">{book.author}</h5>
                    <h5>{book.publishedYear}</h5>
                    <p>{book.publisher}</p>
                </div>
                {/* Reserve card */}
                <div className={styles.reserveCard}>
                    <div className={styles.reserveTitle}>
                        {notification?.type === 'success' ? <h4>Loan created</h4> : <h4>Reserve it!</h4>}
                    </div>
                    {notification?.type === 'success' ? <h4 className={styles.reservedText}>Book reserved</h4>
                        : (<div className={styles.reserveContent}>
                            <p className="card-subtitle my-2">Total copies: {book.totalCopies}</p>
                            <p className="card-subtitle my-2">Available copies: {book.availableCopies}</p>
                            <button className={styles.reserveButton}
                                //  disabled={notification?.type === 'success'}
                                onClick={handleLoan}>
                                Place reservation
                            </button>
                        </div>)}
                </div>
            </div>
            {/* Book description */}
            {<div className={styles.summaryContainer}>
                <div className={styles.summary}>
                    <h5 className={styles.summaryTitle}>Summary</h5>
                    <p className="card-text mt-4">{book.description ?? 'No description available.'}</p>
                </div>
            </div>}
            {/* Book details */}
            <div className={styles.detailsContainer}>
                <div className={styles.details}>
                    <h5 className={styles.detailsTitle}>Record details</h5>
                    {
                        labels.map((label, index) => (
                            <p className={styles.detailsParagraph} key={index}>
                                <span className={styles.detailsHeading}>{label}:</span> <span>{values[index]}</span>
                            </p>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default BookDetail;
