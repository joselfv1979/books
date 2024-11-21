import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/scss/userForm.module.scss';
import { initialUser } from '../data/ConstantUtils';
import { User } from '../types/User';
import { UserFormErrors, validateUser } from '../utils/validateUser';
import { FullNameIcon, MailIcon, PasswordIcon, UserIcon } from './Icons';
import LoadFile from './LoadFile';

type Props = {
    user: User | null;
    saveUser: (data: User) => void;
    register: boolean; // user register flag
};

const UserForm = ({ user, saveUser, register = true }: Props) => {

    // User state management
    const [values, setValues] = useState<User>(user ?? initialUser);
    // Form errors state
    const [errors, setErrors] = useState<UserFormErrors>({});

    // User pictures loader
    const fileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => fileInput.current?.click();

    const navigate = useNavigate();

    // Image files handler
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setValues((prev) => ({ ...prev, image: files[0] }));
        }
    }

    // removes input error when typing
    const removeInputError = (name: string) => {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Input values handler
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        removeInputError(event.target.name);

        setValues((prevState) => ({
            ...prevState, [event.target.name]: event.target.value,
        }));
    };

    // Submit user
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { isValid } = validateUser({ values, errors, setErrors, register });

        if (isValid) {
            saveUser(values);
        }
    };

    const handleNavigateToBooks = () => navigate("/books");

    return (
        <form className={styles.userForm} onSubmit={handleSubmit} data-testid="user-form">
            {register ? <h2>Register</h2> : <h2>Edit Profile</h2>}

            <fieldset className={styles.photoField}>
                <LoadFile fileInput={fileInput} image={values.imagePath} handleFile={handleFile} />
                <Button variant="primary" className={styles.uploadButton} onClick={handleClick}>
                    Upload
                </Button>
            </fieldset>
            {errors.fullname && <div className={styles.fullnameError}>{errors.fullname}</div>}
            <span className={styles.fullnameIcon}><FullNameIcon /></span>
            <fieldset className={styles.fullnameField}>
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
                        onChange={handleChange}
                        className={errors.fullname && 'is-invalid'}
                    />
                </FloatingLabel>
            </fieldset>
            {errors.username && <div className={styles.usernameError}>{errors.username}</div>}
            <span className={styles.userIcon}><UserIcon /></span>
            <fieldset className={styles.usernameField}>
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
                        onChange={handleChange}
                        className={errors.username && 'is-invalid'}
                    />
                </FloatingLabel>
            </fieldset>
            {errors.email && <div className={styles.emailError}>{errors.email}</div>}
            <span className={styles.mailIcon}><MailIcon /></span>
            <fieldset className={styles.emailField}>
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
                        onChange={handleChange}
                        className={errors.email && 'is-invalid'}
                    />
                </FloatingLabel>
            </fieldset>
            {errors.password && <div className={styles.passwordError}>{errors.password}</div>}
            {register && <>
                <span className={styles.passwordIcon}><PasswordIcon /></span>
                <fieldset className={styles.passwordField}>
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
                            onChange={handleChange}
                            className={errors.password && 'is-invalid'}
                        />
                    </FloatingLabel>
                </fieldset>

                <fieldset className={styles.linkField}>
                    <p className="text-center">Do you have an account?</p>
                    <button type="button" className="btn btn-link text-decoration-none align-self-center" onClick={() => navigate("/login")}>
                        Login here
                    </button>
                </fieldset>
            </>}
            <div className={`${register ? styles.registerButtonGroup : styles.editProfileButtonGroup}`}>
                <Button variant="primary" className={styles.submitButton} type="submit">
                    Submit
                </Button>
                {!register &&
                    <Button variant="info" className={styles.submitButton} onClick={handleNavigateToBooks}>
                        Cancel
                    </Button>}
            </div>
        </form>
    );
};

export default UserForm;
