import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../assets/scss/userForm.module.scss';
import { User } from '../types/User';
import { useAppSelector } from '../hooks/redux-hooks';
import { initialUser } from '../data/ConstantUtils';

type Props = {
    saveUser: (data: User) => Promise<void>;
    editing?: boolean;
};

const UserForm = ({ saveUser, editing = false }: Props) => {

    // UserEdit view gets the user from the store
    const { user } = useAppSelector((state) => state.user);

    // UserAdd view uses an empty User object (initialUser)
    const currentUser = user ?? initialUser;

    const [userData, setUserData] = useState<User>(currentUser);

    // const [preview, setPreview] = useState<string>();
    //   const fileInput = useRef<HTMLInputElement>(null);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await saveUser(userData);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const navigate = useNavigate();

    return (
        <Form className={styles.userForm} onSubmit={submit} data-testid="user-form">
            {editing ? <h1>Edit Profile</h1> : <h1>Register</h1>}

            <Form.Group as={Row} className="m-4" controlId="formBasicFullname">
                <Form.Label column sm={3}>
                    Full name
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name="fullname"
                        type="text"
                        value={userData.fullname}
                        placeholder="Enter full name"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="m-4" controlId="formBasicUsername">
                <Form.Label column sm={3}>
                    Username
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name="username"
                        type="text"
                        value={userData.username}
                        placeholder="Enter username"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="m-4" controlId="formBasicEmail">
                <Form.Label column sm={3}>
                    Email
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name="email"
                        type="email"
                        value={userData.email}
                        placeholder="Enter email"
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>

            {!editing ? (
                <Form.Group as={Row} className="m-4" controlId="formBasicPassword">
                    <Form.Label column sm={3}>
                        Password
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            name="password"
                            type="password"
                            value={userData.password}
                            placeholder="Password"
                            autoComplete="off"
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>
            ) : null}

            {/* <Form.Group as={Row} className="m-4" controlId="formBasicFile">
                <Form.Label column sm={3}>
                    Photo
                </Form.Label>
            </Form.Group> */}
            {!editing ? (
                <Form.Group as={Row} className="mb-2">
                    <Row className="col mx-auto">
                        <span className="text-center">Do you have an account?</span>
                        <button type="button" className="btn btn-link text-decoration-none m-auto" onClick={() => navigate("/login")}>
                            Login here
                        </button>
                    </Row>
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
