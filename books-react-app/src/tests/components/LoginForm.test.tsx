import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import LoginForm from '../../components/LoginForm';
import { customRender, screen } from '../utils/test-utils';

const login = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('LoginForm', () => {

    beforeEach(() => customRender(<LoginForm login={login} />));

    it('renders a login form', () => {
        const loginForm = screen.getByTestId('login-form');

        expect(loginForm).toBeInTheDocument();
    });

    it('should display a blank login form', () => {
        const loginForm = screen.getByTestId('login-form');

        expect(loginForm).toHaveFormValues({
            username: '',
            password: '',
        });
    });

    it('renders empty inputs', () => {
        const inputUsername: HTMLInputElement = screen.getByPlaceholderText(/enter username/i);
        const inputPassword: HTMLInputElement = screen.getByPlaceholderText(/enter password/i);

        expect(inputUsername).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();

        expect(inputUsername.value).toBe('');
        expect(inputPassword.value).toBe('');
    });

    it('should allow entering username and password', () => {
        const inputUsername: HTMLInputElement = screen.getByPlaceholderText(/enter username/i);
        const inputPassword: HTMLInputElement = screen.getByPlaceholderText(/enter password/i);

        userEvent.type(inputUsername, 'jose');
        userEvent.type(inputPassword, '1234');

        expect(inputUsername.value).toBe('jose');
        expect(inputPassword.value).toBe('1234');
    });

    it('calls login function with typed values', () => {

        const inputUsername: HTMLInputElement = screen.getByPlaceholderText(/enter username/i);
        const inputPassword: HTMLInputElement = screen.getByPlaceholderText(/enter password/i);

        userEvent.type(inputUsername, 'admin');
        userEvent.type(inputPassword, '1234');

        const submitButton = screen.getByRole('button', { name: /submit/i });
        userEvent.click(submitButton);

        expect(login).toHaveBeenCalledWith({
            username: 'admin',
            password: '1234'
        })
    });

    it('should navigate to the registration page by clicking on the button to create an account', async () => {
        const createAccountButton = screen.getByRole('button', { name: /create an account/i });
        userEvent.click(createAccountButton);

        expect(mockNavigate).toHaveBeenCalledWith("/register");
    });
});
