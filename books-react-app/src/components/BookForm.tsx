import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from '../assets/scss/bookForm.module.scss';
import { initialBook } from '../data/ConstantUtils';
import { useAppSelector } from '../hooks/redux-hooks';
import { Book } from '../types/Book';
import LoadFile from './LoadFile';
import { TagField } from './TagField';

export type Props = {
    saveBook: (data: Book) => Promise<void>;
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
        setValues((prevState) => ({
            ...prevState, [event.target.name]: event.target.value,
        }));
    };

    // Submit form values to views
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await saveBook(values);
    };

    return (
        <form className={styles.bookForm} onSubmit={submit} data-testid="book-form">
            {editing ? <h2>Edit Book</h2> : <h2>New Book</h2>}

            <fieldset className={styles.photoField}>
                <LoadFile fileInput={fileInput} image={values.image} imagePath={values.imagePath} handleFile={handleFile} />
                <Button variant="primary" className={styles.uploadButton} onClick={handleClick}>
                    Upload
                </Button>
            </fieldset>

            <fieldset className={styles.titleField}>
                <label htmlFor='title'>Title</label>
                <Form.Control
                    name="title"
                    type="text"
                    autoComplete='off'
                    value={values.title}
                    placeholder="Enter title"
                    onChange={onChange}
                />
            </fieldset>

            <fieldset className={styles.authorField}>
                <label htmlFor='author'>Author</label>
                <Form.Control
                    name="author"
                    type="text"
                    autoComplete='off'
                    value={values.author}
                    placeholder="Enter author"
                    onChange={onChange}
                />
            </fieldset>

            <fieldset className={styles.publisherField}>
                <label htmlFor='publisher'>Publisher</label>
                <Form.Control
                    name="publisher"
                    type="text"
                    autoComplete='off'
                    value={values.publisher}
                    placeholder="Enter Publisher"
                    onChange={onChange}
                />
            </fieldset>

            <fieldset className={styles.isbnField}>
                <label htmlFor='isbn'>Isbn</label>
                <Form.Control
                    name="isbn"
                    type="text"
                    autoComplete='off'
                    value={values.isbn}
                    placeholder="Enter Isbn"
                    onChange={onChange}
                />
            </fieldset>

            <fieldset className={styles.pagesField}>
                <label htmlFor='pages'>Pages</label>
                <Form.Control
                    name="pages"
                    type="number"
                    autoComplete='off'
                    value={values.pages ?? undefined}
                    placeholder="Enter pages"
                    onChange={onChange}
                />
            </fieldset>

            <fieldset className={styles.genreField}>
                <label htmlFor='genre'>Genre</label>
                <TagField values={values} setValues={setValues} />
            </fieldset>

            <Button variant="primary" className={styles.submitButton} type="submit">
                Submit
            </Button>
        </form>
    );
}

export default BookForm;
