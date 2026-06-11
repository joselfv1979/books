/* Book details */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types/Book';
import { useAppSelector } from '@/hooks/redux-hooks';
import { ROUTES } from '@/utils/constants';
import Info from './Info';
import Button from "./ui/Button";
import { isAdmin } from '@/store/user';
import { LoanWithBookInfo } from '@/types/Loan';

const baseUrl = import.meta.env.VITE_API_URL;

type Props = {
    book: Book | null;
    loans: LoanWithBookInfo[];
    handleLoan: () => void;
    loading?: boolean;
};

const BookDetail: React.FC<Props> = ({ book, loans, handleLoan, loading }) => {

    const admin = useAppSelector(isAdmin);
    const navigate = useNavigate();

    if (!book) return <h2 className="text-center mt-10 text-brand-700">No book found</h2>;    

    const isBookBorrowed = loans.some(loan => loan.bookId === book.id && !loan.returned);
    const disabled = loading || (book.availableCopies ?? 0) <= 0 || isBookBorrowed;
    const image = book?.imagePath ? `${baseUrl}/${book.imagePath}` : undefined;

    const handleEdit = () => {
        if (book?.id) navigate(`${ROUTES.EDIT_BOOK}/${book.id}`);
    };

    return (
        <div className="relative">
            {admin && (
                <div className="absolute top-0 right-0 z-10">
                    <Button variant="outline" onClick={handleEdit}>
                        Edit
                    </Button>
                </div>
            )}
            <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                <div className="space-y-4">
                <div className="aspect-[3/4] bg-surface-muted rounded-lg overflow-hidden flex items-center justify-center">
                    {image ? (
                        <img
                            src={image}
                            alt={book.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <span className="text-sm text-brand-700">No cover</span>
                    )}
                </div>
                <Button disabled={disabled} loading={loading} onClick={handleLoan}>
                    {loading ? "Processing…" : isBookBorrowed ? "Reserved" : disabled ? "Not Available" : "Reserve"}
                </Button>
            </div>

            <div className="space-y-6">
                <header>
                    <h1 className="text-2xl mb-1">{book.title}</h1>
                    <p className="text-base text-brand-700">{book.author}</p>
                </header>

                <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Info label="ISBN" value={book.isbn} />
                    <Info label="Language" value={book.language} />
                    <Info label="Published" value={book.publishedYear} />
                    <Info label="Pages" value={book.pages} />
                    <Info label="Available" value={book.availableCopies} />
                    <Info label="Total" value={book.totalCopies} />
                </section>

                <section>
                    <h2 className="text-base font-semibold mb-2">Description</h2>
                    <p className="text-base text-brand-800">
                        {book.description || "No description."}
                    </p>
                </section>

                <section>
                    <h2 className="text-base font-semibold mb-2">Subjects</h2>
                    <div className="flex flex-wrap gap-2">
                        {book.genre.map(g => (
                            <span key={g} className="badge">
                                {g}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
            </div>
        </div>
    );
};

export default BookDetail;
