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

    // Image files handler
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setValues({ ...values, image: e.target.files[0] });
    }

    // removes input error when typing
    const removeInputError = (name: string) => {

        for (const [key] of Object.entries(errors)) {
            if (key === name) {
                errors[key as keyof UserFormErrors] = undefined;
                setErrors({ ...errors });
                break;
            }
        }
    }

    // Input values handler
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {

        removeInputError(event.target.name);

        setValues((prevState) => ({
            ...prevState, [event.target.name]: event.target.value,
        }));
    };

    // Submit user
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { isValid } = validateUser({ values, errors, setErrors, register });

        if (isValid) {
            saveUser(values);
        }
    };

    const navigate = useNavigate();

    return (
        <form className={styles.userForm} onSubmit={submit} data-testid="user-form">
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                            onChange={onChange}
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
                    <Button variant="info" className={styles.submitButton} onClick={() => navigate(`/books`)}>
                        Cancel
                    </Button>}
            </div>
        </form>
    );
};

export default UserForm;
