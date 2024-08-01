import styles from '@/assets/scss/bookForm.module.scss';
import { initialBook } from '@/data/ConstantUtils';
import { useAppSelector } from '@/hooks/redux-hooks';
import { Book } from '@/types/Book';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadFile from './LoadFile';
import { TagField } from './TagField';

export type Props = {
    saveBook: (data: Book) => void;
    editing?: boolean; // book editing flag
};
// Form for creating or editing a book, used in AddBook and EditBook views
const BookForm = ({ saveBook, editing = false }: Props) => {

    // BookEdit view gets the book from the store
    const { book } = useAppSelector((state) => state.book);

    // BookAdd view uses an empty Book object (initialBook)
    const currentBook = editing && book ? book : initialBook;

    // Book state management
    const [values, setValues] = useState<Book>(currentBook);

    // Book pictures loader
    const fileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => fileInput.current?.click();

    // Image files handler
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setValues({ ...values, image: e.target.files[0] });
    }

    // Input values handler
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values, [event.target.name]: event.target.value,
        });
    };

    // Submit form values to views
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveBook(values);
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
                        className={styles.inputText}
                    />
                </FloatingLabel>
            </fieldset>

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
                        className={styles.inputText}
                    />
                </FloatingLabel>
            </fieldset>

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
                        className={styles.inputText}
                    />
                </FloatingLabel>
            </fieldset>

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
                        className={styles.inputText}
                    />
                </FloatingLabel>
            </fieldset>

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
                        className={styles.inputText}
                    />
                </FloatingLabel>
            </fieldset>

            <fieldset className={styles.genreField}>
                <TagField values={values} setValues={setValues} />
            </fieldset>

            <div className={styles.buttonGroup}>
                <Button variant="primary" className={styles.submitButton} type="submit">
                    Submit
                </Button>
                <Button variant="info" className={styles.submitButton} onClick={() => navigate("/books")}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default BookForm;
