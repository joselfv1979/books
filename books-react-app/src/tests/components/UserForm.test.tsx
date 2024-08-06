import UserForm from '@/components/UserForm';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useLocation } from 'react-router-dom';
import { customRender, screen } from '../utils/test-utils';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: '/register',
    }),
}));

const onChange = jest.fn();

describe('UserForm', () => {

    beforeEach(() => {
        const saveUser = jest.fn();

        customRender(<UserForm saveUser={saveUser} />);
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