import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/globalStyles.module.scss';
import { AuthRequest } from '../types/User';
import { ROUTES } from '../utils/constants';
import Button from './ui/Button';

export type Props = {
    login: (user: AuthRequest) => void;
};

const LoginForm = ({ login }: Props) => {

    const [values, setValues] = useState({ username: "", password: "" });
    const [touched, setTouched] = useState<{ username: boolean; password: boolean }>({
        username: false,
        password: false,
    });

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    };

    const markTouched = (field: "username" | "password") =>
        setTouched(t => ({ ...t, [field]: true }));

    // const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     login(values);
    // };

    const usernameInvalid =
        touched.username && (values.username.trim().length < 3 || values.username.trim().length > 40);

    const passwordInvalid = touched.password && values.password.length < 6;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTouched({ username: true, password: true });
        if (usernameInvalid || passwordInvalid) return;
        login(values);
    };

    const handleNavigateToRegister = () => navigate(ROUTES.ADD_USER);

    return (
        <form
            data-testid="login-form"
            onSubmit={handleSubmit}
            className="card max-w-md mx-auto space-y-8 p-8"
        >
            <h2 className="text-center text-2xl font-semibold">Sign in</h2>

            <div className="space-y-2">
                <label
                    htmlFor="username"
                    className="text-sm font-medium uppercase tracking-wide text-brand-700"
                >
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="input"
                    placeholder="Your username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={() => markTouched('username')}
                    required
                />
                {usernameInvalid && (
                    <p className="text-[11px] text-danger-500">3–40 characters required.</p>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className="text-sm font-medium uppercase tracking-wide text-brand-700"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="input"
                    placeholder="••••••"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={() => markTouched('password')}
                    required
                    minLength={6}
                />
                {passwordInvalid && (
                    <p className="text-[11px] text-danger-500">Minimum 6 characters.</p>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={usernameInvalid || passwordInvalid}
                >
                    Sign in
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleNavigateToRegister}
                >
                    Create an account
                </Button>
            </div>

            <p className="text-center text-sm text-brand-700">
                Forgot password? Contact support.
            </p>
        </form>
    );
};
// <form data-testid="login-form" className={styles.loginForm} onSubmit={handleLogin}>
//     <h2 className="text-center">Login</h2>
//     <div className={styles.inputGroup}>
//         <span className={styles.inputIcon}>
//             <UserIcon />
//         </span>
//         <input type="text"
//             name="username"
//             autoComplete="username"
//             className={styles.inputText}
//             placeholder="Enter username"
//             aria-label="Username"
//             value={values.username}
//             onChange={handleChange} />
//     </div>
//     <div className={styles.inputGroup}>
//         <span className={styles.inputIcon}>
//             <PasswordIcon />
//         </span>
//         <input type="password"
//             name="password"
//             autoComplete="current-password"
//             className={styles.inputText}
//             placeholder="Enter password"
//             aria-label="Password"
//             value={values.password}
//             onChange={handleChange} />
//     </div>

//     <div className={styles.buttonGroup}>
//         <button type="button" className={styles.linkButton}
//             onClick={handleNavigateToRegister}>
//             Create an account
//         </button>
//         <button type="submit" className={styles.primaryButton}>Submit</button>
//     </div>
// </form>
// );

export default LoginForm;
