import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/globalStyles.module.scss';
import styles from '../assets/scss/loginForm.module.scss';
import { AuthRequest } from '../types/User';
import { PasswordIcon, UserIcon } from './Icons';

export type Props = {
    login: (user: AuthRequest) => void;
};

const LoginForm = ({ login }: Props) => {

    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    };

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(values);
    };

    const handleNavigateToRegister = () => navigate("/register");

    return (
        <form data-testid="login-form" className={styles.loginForm} onSubmit={handleLogin}>
            <h2 className="text-center">Login</h2>
            <div className={styles.inputGroup}>
                <span className={styles.inputIcon}>
                    <UserIcon />
                </span>
                <input type="text"
                    name="username"
                    autoComplete="username"
                    className={styles.inputText}
                    placeholder="Enter username"
                    aria-label="Username"
                    value={values.username}
                    onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
                <span className={styles.inputIcon}>
                    <PasswordIcon />
                </span>
                <input type="password"
                    name="password"
                    autoComplete="current-password"
                    className={styles.inputText}
                    placeholder="Enter password"
                    aria-label="Password"
                    value={values.password}
                    onChange={handleChange} />
            </div>

            <div className={styles.buttonGroup}>
                <button type="button" className={styles.linkButton}
                    onClick={handleNavigateToRegister}>
                    Create an account
                </button>
                <button type="submit" className={styles.primaryButton}>Submit</button>
            </div>
        </form>
    );
};

export default LoginForm;
