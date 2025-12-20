import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialBook } from '@/data/ConstantUtils';
import { Book } from '@/types/Book';
import { ROUTES } from '@/utils/constants';
import { BookFormErrors, validateBook } from '@/utils/validateBook';
import LoadFile from './LoadFile';
import { TagField } from './TagField';
import Button from './ui/Button';

export type Props = {
    book: Book | null;
    saveBook: (data: Book) => void;
    editing: boolean;
};

const BookForm = ({ book, saveBook, editing = false }: Props) => {
    if (!book) return <h2 className="text-center text-2xl font-semibold">No book found</h2>;

    const [values, setValues] = useState<Book>(book ?? initialBook);
    const [errors, setErrors] = useState<BookFormErrors>({});
    const fileInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setValues(prev => ({ ...prev, image: file }));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { isValid } = validateBook({ values, errors, setErrors });
        if (isValid) saveBook(values);
    };

    const handleNavigateToBooks = () => navigate(ROUTES.ALL_BOOKS);

    return (
        <form
            onSubmit={handleSubmit}
            data-testid="book-form"
            className="card max-w-2xl mx-auto space-y-6 p-8"
        >
            <h3 className="text-center text-2xl font-semibold">
                {editing ? 'Edit Book' : 'New Book'}
            </h3>
            <span className="text-[11px] text-brand-700 block text-center">
                Required fields *
            </span>

            {/* Title */}
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                    Title *
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={values.title}
                    placeholder="Enter title"
                    onChange={handleChange}
                    className="input"
                    required
                />
                {errors.title && <p className="text-[11px] text-danger-500">{errors.title}</p>}
            </div>

            {/* Author */}
            <div className="space-y-2">
                <label htmlFor="author" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                    Author *
                </label>
                <input
                    id="author"
                    name="author"
                    type="text"
                    autoComplete="off"
                    value={values.author}
                    placeholder="Enter author"
                    onChange={handleChange}
                    className="input"
                    required
                />
                {errors.author && <p className="text-[11px] text-danger-500">{errors.author}</p>}
            </div>

            {/* Publisher */}
            <div className="space-y-2">
                <label htmlFor="publisher" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                    Publisher *
                </label>
                <input
                    id="publisher"
                    name="publisher"
                    type="text"
                    autoComplete="off"
                    value={values.publisher}
                    placeholder="Enter publisher"
                    onChange={handleChange}
                    className="input"
                    required
                />
                {errors.publisher && <p className="text-[11px] text-danger-500">{errors.publisher}</p>}
            </div>

            {/* ISBN and Pages - responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="isbn" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                        ISBN *
                    </label>
                    <input
                        id="isbn"
                        name="isbn"
                        type="text"
                        autoComplete="off"
                        value={values.isbn}
                        placeholder="Enter ISBN"
                        onChange={handleChange}
                        className="input"
                        required
                    />
                    {errors.isbn && <p className="text-[11px] text-danger-500">{errors.isbn}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="pages" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                        Pages *
                    </label>
                    <input
                        id="pages"
                        name="pages"
                        type="number"
                        autoComplete="off"
                        value={values.pages}
                        placeholder="Enter pages"
                        onChange={handleChange}
                        className="input"
                        required
                        min="1"
                    />
                    {errors.pages && <p className="text-[11px] text-danger-500">{errors.pages}</p>}
                </div>
            </div>

            {/* Tags */}
            <TagField values={values} setValues={setValues} />

            {/* Language, Copies, and Year - responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label htmlFor="language" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                        Language *
                    </label>
                    <input
                        id="language"
                        name="language"
                        type="text"
                        autoComplete="off"
                        value={values.language}
                        placeholder="Enter language"
                        onChange={handleChange}
                        className="input"
                        required
                    />
                    {errors.language && <p className="text-[11px] text-danger-500">{errors.language}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="totalCopies" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                        Copies *
                    </label>
                    <input
                        id="totalCopies"
                        name="totalCopies"
                        type="number"
                        autoComplete="off"
                        value={values.totalCopies}
                        placeholder="Enter copies"
                        onChange={handleChange}
                        className="input"
                        required
                        min="1"
                    />
                    {errors.copiesCount && <p className="text-[11px] text-danger-500">{errors.copiesCount}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="publishedYear" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                        Year *
                    </label>
                    <input
                        id="publishedYear"
                        name="publishedYear"
                        type="number"
                        min="1000"
                        max={new Date().getFullYear()}
                        value={values.publishedYear}
                        onChange={handleChange}
                        placeholder="YYYY"
                        className="input"
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    autoComplete="off"
                    value={values.description}
                    placeholder="Leave a comment here"
                    onChange={handleChange}
                    className="input min-h-[100px] resize-y"
                    rows={4}
                />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium uppercase tracking-wide text-brand-700">
                    Cover Image
                </label>
                <LoadFile
                    fileInput={fileInput}
                    image={values.imagePath}
                    handleFile={handleFile}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" variant="primary" className="flex-1">
                    Submit
                </Button>
                <Button type="button" variant="outline" onClick={handleNavigateToBooks} className="flex-1">
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default BookForm;
