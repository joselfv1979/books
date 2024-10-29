import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
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
            fullname: '',
            username: '',
            email: '',
            password: '',
            image: '',
        });
    });

    it('should allow entering a fullname', async () => {
        const inputFullname: HTMLInputElement = screen.getByPlaceholderText(/enter full name/i);
        expect(inputFullname).toBeInTheDocument();

        inputFullname.onchange = onChange;

        fireEvent.change(inputFullname, { target: { value: 'Muhammad Lahin' } });

        expect(inputFullname.value).toBe('Muhammad Lahin');
        expect(onChange).toHaveBeenCalled();
    });
});