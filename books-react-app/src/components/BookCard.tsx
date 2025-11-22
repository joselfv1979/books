import { Link } from 'react-router-dom';
import { Book } from '../types/Book';
import Card from "./ui/Card";

const baseUrl = import.meta.env.VITE_API_URL;

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    const image = book.imagePath ? `${baseUrl}/${book.imagePath}` : undefined;

    return (
        <Card className="group p-5 md:p-6 overflow-hidden flex flex-col h-full">
            {/* Image */}
            <div className="relative rounded-lg bg-surface-muted overflow-hidden w-full aspect-[3/4] mb-5">
                {image ? (
                    <img
                        src={image}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[11px] text-brand-600">
                        No image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 gap-3">
                <header className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                        {book.title}
                    </h3>
                    <p className="text-base text-brand-700 line-clamp-1">
                        {book.author}
                    </p>
                </header>

                <p className="text-sm text-brand-800 line-clamp-4">
                    {book.description || "No description available."}
                </p>

                <div className="flex flex-wrap gap-2">
                    {book.genre.slice(0, 5).map(g => (
                        <span
                            key={g}
                            className="badge px-3 py-1 text-sm"
                        >
                            {g}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 text-[12px] text-brand-800">
                    <span>Avail: {book.availableCopies ?? 0}</span>
                    <span>Total: {book.totalCopies ?? 0}</span>
                    {book.pages && <span>{book.pages} pages</span>}
                </div>

                <div className="mt-auto">
                    <Link
                        to={`/book/${book.id}`}
                        className="btn btn-primary w-full text-base"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default BookCard;