
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/globalStyles.module.scss';
import { Auth } from '../types/Auth';
import { PasswordIcon, UserIcon } from './Icons';

export type Props = {
    loginUser: (user: Auth) => void;
};

const LoginForm = ({ loginUser }: Props) => {
    const initialState = {
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
        <form data-testid="login-form" className="mx-auto w-50 p-5" onSubmit={handleLogin}>
            <h2 className="m-5 text-center">Login</h2>
            <div className="input-group mx-auto my-5 w-50">
                <span className="input-group-text" id="basic-addon1">
                    <UserIcon />
                </span>
                <input type="text" name="username" autoComplete="on" className="form-control" placeholder="Enter username" onChange={onChange} />
            </div>
            <div className="input-group mx-auto my-5 w-50">
                <span className="input-group-text" id="basic-addon2">
                    <PasswordIcon />
                </span>
                <input type="password" name="password" autoComplete="off" className="form-control" placeholder="Enter password" onChange={onChange} />
            </div>

            <div className="d-flex my-4">
                <button type="button" className="btn btn-link text-decoration-none mx-auto"
                    onClick={() => navigate("/register")}>
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
