import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row } from 'react-bootstrap';
import { User } from '../types/User';
import { useAppSelector } from '../hooks/redux-hooks';
import { initialUser } from '../data/ConstantUtils';
import LoadFile from './LoadFile';
import styles from '../assets/scss/userForm.module.scss';

type Props = {
    saveUser: (data: User) => Promise<void>;
    editing?: boolean; // profile editing flag
};

const UserForm = ({ saveUser, editing = false }: Props) => {

    // UserEdit view gets the user from the store
    const { user } = useAppSelector((state) => state.user);
    // UserAdd view uses an empty User object (initialUser)
    const currentUser = user ?? initialUser;

    // User state management
    const [values, setValues] = useState<User>(currentUser);

    // User pictures loader
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

    // Submit user
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await saveUser(values);
    };

    const navigate = useNavigate();

    return (
        <form className={styles.userForm} onSubmit={submit} data-testid="user-form">
            {editing ? <h2>Edit Profile</h2> : <h2>Register</h2>}

            <fieldset className={styles.photoField}>
                <LoadFile fileInput={fileInput} image={values.image} imagePath={values.imagePath} handleFile={handleFile} />
                <Button variant="primary" className={styles.uploadButton} onClick={handleClick}>
                    Upload
                </Button>
            </fieldset>
            <fieldset className={styles.fullnameField}>
                <label htmlFor='fullname'>Full name</label>
                <Form.Control
                    name="fullname"
                    type="text"
                    autoComplete='off'
                    value={values.fullname}
                    placeholder="Enter full name"
                    onChange={onChange}
                />
            </fieldset>
            <fieldset className={styles.usernameField}>
                <label htmlFor='username'>Username</label>
                <Form.Control
                    name="username"
                    type="text"
                    autoComplete='off'
                    value={values.username}
                    placeholder="Enter username"
                    onChange={onChange}
                />
            </fieldset>
            <fieldset className={styles.emailField}>
                <label htmlFor='email'>Email</label>
                <Form.Control
                    name="email"
                    type="email"
                    autoComplete='off'
                    value={values.email}
                    placeholder="Enter email"
                    onChange={onChange}
                />
            </fieldset>
            {!editing && (
                <fieldset className={styles.passwordField}>
                    <label htmlFor='password'>Password</label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={values.password}
                        placeholder="Password"
                        autoComplete="off"
                        onChange={onChange}
                    />
                </fieldset>
            )}
            {!editing && (
                <fieldset className={styles.linkField}>
                    <Row className="col mx-auto">
                        <span className="text-center">Do you have an account?</span>
                        <button type="button" className="btn btn-link text-decoration-none m-auto" onClick={() => navigate("/login")}>
                            Login here
                        </button>
                    </Row>
                </fieldset>
            )}
            <Button variant="primary" className={styles.submitButton} type="submit">
                Submit
            </Button>
        </form>

    );
};

export default UserForm;
