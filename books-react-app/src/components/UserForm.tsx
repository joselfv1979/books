import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/scss/userForm.module.scss';
import { initialUser } from '../data/ConstantUtils';
import { useAppSelector } from '../hooks/redux-hooks';
import { User } from '../types/User';
import { FullNameIcon, MailIcon, PasswordIcon, UserIcon } from './Icons';
import LoadFile from './LoadFile';

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
                <LoadFile fileInput={fileInput} image={values.imagePath} handleFile={handleFile} />
                <Button variant="primary" className={styles.uploadButton} onClick={handleClick}>
                    Upload
                </Button>
            </fieldset>
            <fieldset className={styles.fullnameField}>
                <FullNameIcon />
                <FloatingLabel
                    label="Fullname"
                    controlId='fullname'
                    className="w-100"
                >
                    <Form.Control
                        name="fullname"
                        type="text"
                        autoComplete='off'
                        value={values.fullname}
                        placeholder="Enter full name"
                        onChange={onChange}
                        className={styles.inputText}
                    />
                </FloatingLabel>
            </fieldset>
            <fieldset className={styles.usernameField}>
                <UserIcon />
                <FloatingLabel
                    label="Username"
                    controlId='username'
                    className="w-100"
                >
                    <Form.Control
                        name="username"
                        type="text"
                        autoComplete='off'
                        value={values.username}
                        placeholder="Enter username"
                        onChange={onChange}
                        className={styles.inputText}
                    />
                </FloatingLabel>
            </fieldset>
            <fieldset className={styles.emailField}>
                <MailIcon />
                <FloatingLabel
                    label="Email"
                    controlId='email'
                    className="w-100"
                >
                    <Form.Control
                        name="email"
                        type="email"
                        autoComplete='off'
                        value={values.email}
                        placeholder="Enter email"
                        onChange={onChange}
                        className={styles.inputText}
                    />
                </FloatingLabel>
            </fieldset>

            {!editing &&
                <fieldset className={styles.passwordField}>
                    <PasswordIcon />
                    <FloatingLabel
                        label="Password"
                        controlId="password"
                        className="w-100"
                    >
                        <Form.Control
                            name="password"
                            type="password"
                            value={values.password}
                            placeholder="Password"
                            autoComplete="off"
                            onChange={onChange}
                            className={styles.inputText}
                        />
                    </FloatingLabel>
                </fieldset>}

            {!editing &&
                <fieldset className={styles.linkField}>
                    <p className="text-center">Do you have an account?</p>
                    <button type="button" className="btn btn-link text-decoration-none align-self-center" onClick={() => navigate("/login")}>
                        Login here
                    </button>
                </fieldset>}

            <div className={styles.buttonGroup}>
                <Button variant="primary" className={styles.submitButton} type="submit">
                    Submit
                </Button>
                {editing &&
                    <Button variant="info" className={styles.submitButton} onClick={() => navigate(`/books`)}>
                        Cancel
                    </Button>}
            </div>

        </form>
    );
};

export default UserForm;
