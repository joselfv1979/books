import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../scss/userForm.module.scss';
import { initialUser, IUser } from '../types/User';
import { castUserToFormData } from '../utils/castFormData';
import CurrentImage from './CurrentImage';
import ImagePreview from './ImagePreview';
import { useTypedSelector } from '../hooks/useTypeSelector';

export type Props = {
    saveUser: (data: FormData) => Promise<void>;
};

const UserForm = ({ saveUser }: Props) => {
    const { pathname } = useLocation();
    const editing = pathname === '/register' ? false : true;

    const { user } = useTypedSelector((state) => state.users);
    const currentUser = editing && user ? user : initialUser;

    const [values, setValues] = useState<IUser>(currentUser);

    const [preview, setPreview] = useState<string>();
    const fileInput = useRef<HTMLInputElement>(null);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = castUserToFormData(values);

        await saveUser(data);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            setValues({ ...values, image: target.files[0] });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(target.files[0]);
        }
    };

    const handleClick = () => {
        fileInput.current?.click();
    };

    const navigate = useNavigate();

    return (
        <Form className={styles.userForm} onSubmit={submit} data-testid="user-form">
            {editing ? <h1>Edit Profile</h1> : <h1>Register</h1>}

            <Form.Group as={Row} className="mb-3" controlId="formBasicFullname">
                <Form.Label column sm={3}>
                    Full name
                </Form.Label>
                <Col sm={7}>
                    <Form.Control
                        name="fullname"
                        type="text"
                        value={values.fullname}
                        placeholder="Enter full name"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
                <Form.Label column sm={3}>
                    Username
                </Form.Label>
                <Col sm={7}>
                    <Form.Control
                        name="username"
                        type="text"
                        value={values.username}
                        placeholder="Enter username"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                <Form.Label column sm={3}>
                    Email
                </Form.Label>
                <Col sm={7}>
                    <Form.Control
                        name="email"
                        type="email"
                        value={values.email}
                        placeholder="Enter email"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>

            {!editing ? (
                <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                    <Form.Label column sm={3}>
                        Password
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control
                            name="password"
                            type="password"
                            value={values.password}
                            placeholder="Password"
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>
            ) : null}

            <Form.Group as={Row} className="mb-3" controlId="formBasicFile">
                <Form.Label column sm={3}>
                    Photo
                </Form.Label>
                <Col sm={7} className={styles.flex_col}>
                    <Form.Control
                        name="image"
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInput}
                        onChange={handleImage}
                    />
                    <Button variant="primary" className={styles.upload_button} onClick={handleClick}>
                        Upload
                    </Button>
                    {values.image ? (
                        <ImagePreview image={values.image} preview={preview} />
                    ) : (
                        <CurrentImage imageUrl={values.imagePath} />
                    )}
                </Col>
            </Form.Group>
            {editing ? (
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}></Form.Label>
                    <Col sm={7}>
                        Do you have an account?
                        <span className={styles.login_span} onClick={() => navigate('/login')}>
                            Login here
                        </span>
                    </Col>
                </Form.Group>
            ) : null}

            <Form.Group>
                <Row className="col-md-4 mx-auto">
                    <Button variant="primary" className={styles.submit_button} type="submit">
                        Submit
                    </Button>
                </Row>
            </Form.Group>
        </Form>
    );
};

export default UserForm;
