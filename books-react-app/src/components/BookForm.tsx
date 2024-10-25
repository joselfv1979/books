import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/scss/bookForm.module.scss';
import { initialBook } from '../data/ConstantUtils';
import { Book } from '../types/Book';
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

    // Book state management
    const [values, setValues] = useState<Book>(book ?? initialBook);
    // Form errors state
    const [errors, setErrors] = useState<BookFormErrors>({});

    // Book pictures loader
    const fileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => fileInput.current?.click();

    // Image files handler
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setValues({ ...values, image: e.target.files[0] });
    }

    // removes input error when typing
    const removeInputError = (name: string) => {

        for (const [key] of Object.entries(errors)) {
            if (key === name) {
                errors[key as keyof BookFormErrors] = undefined;
                setErrors({ ...errors });
                break;
            }
        }
    }

    // Input values handler
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {

        removeInputError(event.target.name);

        setValues({
            ...values, [event.target.name]: event.target.value,
        });
    };

    // Submit form values to views
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { isValid } = validateBook({ values, errors, setErrors });

        if (isValid) {
            saveBook(values);
        }
    };

    const navigate = useNavigate();

    return (
        <form className={styles.bookForm} onSubmit={submit} data-testid="book-form">
            {editing ? <h2>Edit Book</h2> : <h2>New Book</h2>}

            <fieldset className={styles.photoField}>
                <LoadFile fileInput={fileInput} image={values.imagePath} handleFile={handleFile} />
                <Button variant="primary" className={styles.uploadButton} onClick={handleClick}>
                    Upload
                </Button>
            </fieldset>
            {errors.title && <div className={styles.titleError}>{errors.title}</div>}
            <fieldset className={styles.titleField}>
                <FloatingLabel
                    controlId="title"
                    label="Enter title"
                >
                    <Form.Control
                        name="title"
                        type="text"
                        autoComplete='off'
                        value={values.title}
                        placeholder="Enter title"
                        onChange={onChange}
                        className={errors.title && 'is-invalid'}
                    />
                </FloatingLabel>
            </fieldset>
            {errors.author && <div className={styles.authorError}>{errors.author}</div>}
            <fieldset className={styles.authorField}>
                <FloatingLabel
                    controlId="author"
                    label="Enter author"
                >
                    <Form.Control
                        name="author"
                        type="text"
                        autoComplete='off'
                        value={values.author}
                        placeholder="Enter author"
                        onChange={onChange}
                        className={errors.author && 'is-invalid'}
                    />
                </FloatingLabel>
            </fieldset>
            {errors.publisher && <div className={styles.publisherError}>{errors.publisher}</div>}
            <fieldset className={styles.publisherField}>
                <FloatingLabel
                    controlId="publisher"
                    label="Enter publisher"
                >
                    <Form.Control
                        name="publisher"
                        type="text"
                        autoComplete='off'
                        value={values.publisher}
                        placeholder="Enter publisher"
                        onChange={onChange}
                        className={errors.publisher && 'is-invalid'}
                    />
                </FloatingLabel>
            </fieldset>
            {errors.isbn && <div className={styles.isbnError}>{errors.isbn}</div>}
            <fieldset className={styles.isbnField}>
                <FloatingLabel
                    controlId="isbn"
                    label="Enter isbn"
                >
                    <Form.Control
                        name="isbn"
                        type="text"
                        autoComplete='off'
                        value={values.isbn}
                        placeholder="Enter isbn"
                        onChange={onChange}
                        className={errors.isbn && 'is-invalid'}
                    />
                </FloatingLabel>
            </fieldset>
            {errors.pages && <div className={styles.pagesError}>{errors.pages}</div>}
            <fieldset className={styles.pagesField}>
                <FloatingLabel
                    controlId="pages"
                    label="Enter pages"
                >
                    <Form.Control
                        name="pages"
                        type="number"
                        autoComplete='off'
                        value={values.pages ?? undefined}
                        placeholder="Enter pages"
                        onChange={onChange}
                        className={errors.pages && 'is-invalid'}
                    />
                </FloatingLabel>
            </fieldset>

            <fieldset className={styles.genreField}>
                <TagField values={values} setValues={setValues} />
            </fieldset>

            <div className={styles.buttonGroup}>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="info" onClick={() => navigate("/books")}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default BookForm;
