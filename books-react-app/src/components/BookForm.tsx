import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/scss/bookForm.module.scss';
import { initialBook } from '../data/ConstantUtils';
import { Book } from '../types/Book';
import { ROUTES } from '../utils/constants';
import { BookFormErrors, validateBook } from '../utils/validateBook';
import LoadFile from './LoadFile';
import { TagField } from './TagField';

export type Props = {
    book: Book | null;
    saveBook: (data: Book) => void;
    editing: boolean; // book editing flag
};
// Form for creating or editing a book, used in AddBook and EditBook views
const BookForm = ({ book, saveBook, editing = false }: Props) => {

    if (!book) return <h2>No book found</h2>;

    // Book state management
    const [values, setValues] = useState<Book>(book ?? initialBook);
    // Form errors state
    const [errors, setErrors] = useState<BookFormErrors>({});

    // Book pictures loader
    const fileInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    // Image files handler
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setValues((prev) => ({ ...prev, image: files[0] }));
        }
    };

    // Input values handler
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        console.log('year');

        console.log(event.target.name + ': ' + event.target.value);

        setValues((prevState) => ({
            ...prevState, [event.target.name]: event.target.value,
        }));

        // removes input error when typing
        setErrors((prev) => ({ ...prev, [event.target.name]: undefined }));
    };

    // Submit form values to views
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { isValid } = validateBook({ values, errors, setErrors });

        if (isValid) {
            saveBook(values);
        }
    };

    const handleNavigateToBooks = () => navigate(ROUTES.ALL_BOOKS);

    return (
        <form className={styles.bookForm} onSubmit={handleSubmit} data-testid="book-form">

            <h3 className={styles.title}>{`${editing ? 'Edit' : 'New'} Book`}</h3>
            <span className={styles.warning}>Required fields.</span>

            <fieldset className={`${styles.textField} ${errors.title && styles.isInvalid}`}>
                <input
                    name="title"
                    type="text"
                    autoComplete='off'
                    value={values.title}
                    placeholder="Enter title"
                    onChange={handleChange}
                    className={styles.bookFormInput}
                />
                <span className={styles.asterisk}>*</span>
            </fieldset>

            <fieldset className={`${styles.textField} ${errors.author && styles.isInvalid}`}>
                <input
                    name="author"
                    type="text"
                    autoComplete='off'
                    value={values.author}
                    placeholder="Enter author"
                    onChange={handleChange}
                    className={styles.bookFormInput}
                />
                <span className={styles.asterisk}>*</span>
            </fieldset>

            <fieldset className={`${styles.textField} ${errors.publisher && styles.isInvalid}`}>
                <input
                    name="publisher"
                    type="text"
                    autoComplete='off'
                    value={values.publisher}
                    placeholder="Enter publisher"
                    onChange={handleChange}
                    className={styles.bookFormInput}
                />
                <span className={styles.asterisk}>*</span>
            </fieldset>

            <fieldset className={styles.clusteredField}>

                <fieldset className={`${styles.isbnField} ${errors.isbn && styles.isInvalid}`}>
                    <input
                        name="isbn"
                        type="text"
                        autoComplete='off'
                        value={values.isbn}
                        placeholder="Enter isbn"
                        onChange={handleChange}
                        className={styles.bookFormInput}
                    />
                    <span className={styles.asterisk}>*</span>
                </fieldset>

                <fieldset className={`${styles.pagesField} ${errors.pages && styles.isInvalid}`}>
                    <input
                        name="pages"
                        type="number"
                        autoComplete='off'
                        value={values.pages}
                        placeholder="Enter pages"
                        onChange={handleChange}
                        className={styles.bookFormInput}
                    />
                    <span className={styles.asterisk}>*</span>
                </fieldset>

            </fieldset>

            <TagField values={values} setValues={setValues} />

            <fieldset className={styles.clusteredField}>
                <fieldset className={`${styles.textField} ${errors.language && styles.isInvalid}`}>
                    <input
                        name="language"
                        type="text"
                        autoComplete='off'
                        value={values.language}
                        placeholder="Enter language"
                        onChange={handleChange}
                        className={styles.bookFormInput}
                    />
                    <span className={styles.asterisk}>*</span>
                </fieldset>

                <fieldset className={`${styles.textField} ${errors.copiesCount && styles.isInvalid}`}>
                    <input
                        name="totalCopies"
                        type="number"
                        autoComplete='off'
                        value={values.totalCopies}
                        placeholder="Enter copies"
                        onChange={handleChange}
                        className={styles.bookFormInput}
                    />
                    <span className={styles.asterisk}>*</span>
                </fieldset>
            </fieldset>

            <fieldset className={styles.textField}>
                <textarea
                    name="description"
                    autoComplete='off'
                    value={values.description}
                    placeholder="Leave a comment here"
                    onChange={handleChange}
                    className={styles.bookFormTextarea}
                />
            </fieldset>

            <fieldset className={styles.photoField}>
                <LoadFile
                    fileInput={fileInput}
                    image={values.imagePath}
                    handleFile={handleFile} />
            </fieldset>

            {/* <div>
                <label htmlFor="date">Pick a date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={values.publishedYear}
                    onChange={handleChange}
                />
            </div> */}
            <input
                type="number"
                name="publishedYear"
                min="1000"
                max={new Date().getFullYear()}
                value={values.publishedYear}
                onChange={handleChange}
                placeholder="YYYY"
                required
                className="border p-2 rounded w-full"
            />

            <div className={styles.buttonGroup}>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="info" onClick={handleNavigateToBooks}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default BookForm;
