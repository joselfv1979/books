import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/scss/userForm.module.scss';
import { initialUser } from '../data/ConstantUtils';
import { User } from '../types/User';
import { UserFormErrors, validateUser } from '../utils/validateUser';
import { MailIcon, PasswordIcon, UserIcon } from './Icons';
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

            <h3>{register ? 'Register' : 'Edit profile'}</h3>
            <span className={styles.warning}>Required fields.</span>

            <fieldset className={`${styles.textField} ${errors.username && styles.isInvalid}`}>
                <span className={styles.userIcon}><UserIcon /></span>
                <input
                    name="username"
                    type="text"
                    autoComplete='off'
                    value={values.username}
                    placeholder="Enter username"
                    onChange={handleChange}
                    className={styles.userFormInput}
                />
                <span className={styles.asterisk}>*</span>
            </fieldset>

            <fieldset className={`${styles.textField} ${errors.email && styles.isInvalid}`}>
                <span className={styles.mailIcon}><MailIcon /></span>
                <input
                    name="email"
                    type="text"
                    autoComplete='off'
                    value={values.email}
                    placeholder="Enter email"
                    onChange={handleChange}
                    className={styles.userFormInput}
                />
                <span className={styles.asterisk}>*</span>
            </fieldset>

            {register &&
                <fieldset className={`${styles.textField} ${errors.password && styles.isInvalid}`}>
                    <span className={styles.passwordIcon}><PasswordIcon /></span>
                    <input
                        name="password"
                        type="password"
                        value={values.password}
                        placeholder="Password"
                        autoComplete="off"
                        onChange={handleChange}
                        className={styles.userFormInput}
                    />
                    <span className={styles.asterisk}>*</span>
                </fieldset>
            }
            <fieldset className={styles.photoField}>
                <LoadFile
                    fileInput={fileInput}
                    image={values.imagePath}
                    handleFile={handleFile} />
            </fieldset>

            {register &&
                <fieldset className={styles.linkField}>
                    <p className="text-center">Do you have an account?</p>
                    <button type="button" className="btn btn-link text-decoration-none align-self-center" onClick={() => navigate("/login")}>
                        Login here
                    </button>
                </fieldset>}

            <div className={styles.buttonGroup}>
                <Button variant="primary" type="submit" title='Submit'>Submit</Button>
                {!register &&
                    <Button variant="info" onClick={handleNavigateToBooks}>Cancel</Button>}
            </div>
        </form>
    );
};

export default UserForm;
