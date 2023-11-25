import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../scss/login.module.scss';
import { Auth } from '../types/Auth';

export type Props = {
    loginUser: (userData: Auth) => void;
};

const LoginForm = ({ loginUser }: Props) => {
    const initialState: Auth = {
        username: '',
        password: '',
    };

    const [values, setValues] = useState(initialState);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const navigate = useNavigate();

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginUser(values);
    };

    return (
        <Form className={styles.loginForm} data-testid="login-form" onSubmit={handleLogin}>
            <h1>Login</h1>
            <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
                <Form.Label column sm={3}>
                    Username
                </Form.Label>
                <Col sm={7}>
                    <Form.Control name="username" type="text" placeholder="Enter username" onChange={onChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                <Form.Label column sm={3}>
                    Password
                </Form.Label>
                <Col sm={7}>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={onChange} />
                </Col>
            </Form.Group>
            <Form.Group>
                <Row className="col-md-4 mx-auto">
                    <span className={styles.accountText} onClick={() => navigate('/register')}>
                        Create an account
                    </span>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row className="col-md-4 mx-auto">
                    <Button variant="primary" type="submit" className={styles.loginButton}>
                        Submit
                    </Button>
                </Row>
            </Form.Group>
        </Form>
    );
};

export default LoginForm;
