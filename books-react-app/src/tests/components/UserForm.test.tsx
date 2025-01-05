import { fireEvent, renderHook } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { vi } from 'vitest';
import UserForm from '../../components/UserForm';
import { initialUser } from '../../data/ConstantUtils';
import { customRender, screen } from '../utils/test-utils';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useLocation: () => ({
            pathname: '/register',
        }),
    };
});

const onChange = vi.fn();

describe('UserForm', () => {

    beforeEach(() => {
        const saveUser = vi.fn();

        customRender(<UserForm user={initialUser} saveUser={saveUser} register={true} />);
    });

    it('renders a user form', () => {
        const userForm = screen.getByTestId('user-form');

        expect(userForm).toBeInTheDocument();
    });

    it('title should display register', () => {
        const header = screen.getByRole('heading');

        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent(/register/i);
    });

    it('should display a blank user form', () => {
        const userForm = screen.getByTestId('user-form');

        const { result } = renderHook(() => useLocation());

        expect(result.current.pathname).toBe('/register');

        expect(userForm).toHaveFormValues({
            username: '',
            email: '',
            password: '',
            image: '',
        });
    });

    it('should allow entering a username', async () => {
        const inputUsername: HTMLInputElement = screen.getByPlaceholderText(/enter username/i);
        expect(inputUsername).toBeInTheDocument();

        inputUsername.onchange = onChange;

        fireEvent.change(inputUsername, { target: { value: 'moises' } });

        expect(inputUsername.value).toBe('moises');
        expect(onChange).toHaveBeenCalled();
    });
});