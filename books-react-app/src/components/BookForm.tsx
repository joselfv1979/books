import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { Book } from '../types/Book';
import { castBookToFormData } from '../utils/castFormData';
import { initialBook } from 'data/ConstantUtils';
import LoadFile from './LoadFile';
import styles from '../assets/scss/bookForm.module.scss';

export type Props = {
    saveBook: (data: FormData) => Promise<void>;
};

const BookForm = ({ saveBook }: Props) => {
    const { pathname } = useLocation();
    const editing = pathname !== '/newBook';

    const { book } = useAppSelector((state) => state.book);
    const currentBook = editing && book ? book : initialBook;

    const [values, setValues] = useState<Book>(currentBook);

    const fileInput = useRef<HTMLInputElement>(null);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = castBookToFormData(values);
        await saveBook(data);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleClick = () => {
        fileInput.current?.click();
    };

    return (
        <Form className={styles.bookForm} onSubmit={submit} data-testid="book-form">
            {editing ? <h1>Edit Book</h1> : <h1>New Book</h1>}

            <Form.Group as={Row} className="my-4" controlId="formBasicFullName">
                <Form.Label column sm={2}>
                    Title
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name="title"
                        type="text"
                        value={values.title}
                        placeholder="Enter title"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="my-4" controlId="formBasicFullName">
                <Form.Label column sm={2}>
                    Author
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name="author"
                        type="text"
                        value={values.author}
                        placeholder="Enter author"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="my-4" controlId="formBasicFullName">
                <Form.Label column sm={2}>
                    Price
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name="price"
                        type="number"
                        value={values.price ?? undefined}
                        placeholder="Enter price"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="my-4" controlId="formBasicFullName">
                <Form.Label column sm={2}>
                    Pages
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name="pages"
                        type="number"
                        value={values.pages}
                        placeholder="Enter pages"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="my-5" controlId="formBasicFile">
                <Form.Label column sm={3}>
                    Photo
                </Form.Label>
                <Col sm={7} className={styles.flex_col}>
                    <Button variant="primary" className={styles.upload_button} onClick={handleClick}>
                        Upload
                    </Button>
                    <LoadFile values={values} fileInput={fileInput} setValues={setValues} />
                </Col>
            </Form.Group>

            <Form.Group>
                <Row className="col-md-4 mx-auto">
                    <Button variant="primary" className={styles.bookFormButton} type="submit">
                        Submit
                    </Button>
                </Row>
            </Form.Group>
        </Form>
    );
};

export default BookForm;