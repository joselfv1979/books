import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/globalStyles.module.scss';
import { Auth } from '../types/Auth';
import { PasswordIcon, UserIcon } from './Icons';

export type Props = {
    login: (user: Auth) => void;
};

const LoginForm = ({ login }: Props) => {

    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }))
    };

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(values);
    };

    const handleNavigateToRegister = () => navigate("/register");

    return (
        <form data-testid="login-form" className="mx-auto w-50 p-5" onSubmit={handleLogin}>
            <h2 className="m-5 text-center">Login</h2>
            <div className="input-group mx-auto my-5 w-50">
                <span className="input-group-text" id="basic-addon1">
                    <UserIcon />
                </span>
                <input type="text"
                    name="username"
                    autoComplete="on"
                    className="form-control"
                    placeholder="Enter username"
                    aria-label="Username"
                    value={values.username}
                    onChange={handleChange} />
            </div>
            <div className="input-group mx-auto my-5 w-50">
                <span className="input-group-text" id="basic-addon2">
                    <PasswordIcon />
                </span>
                <input type="password"
                    name="password"
                    autoComplete="off"
                    className="form-control"
                    placeholder="Enter password"
                    aria-label="Password"
                    value={values.password}
                    onChange={handleChange} />
            </div>

            <div className="d-flex my-4">
                <button type="button" className="btn btn-link text-decoration-none mx-auto"
                    onClick={handleNavigateToRegister}>
                    Create an account
                </button>
            </div>
            <div className="d-flex">
                <button type="submit" className="btn btn-primary btn-lg w-25 mx-auto">Submit</button>
            </div>
        </form>
    );
};

export default LoginForm;
