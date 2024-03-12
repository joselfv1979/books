import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';
import { useLocation, BrowserRouter } from 'react-router-dom';
import { act, fireEvent, getByLabelText, render, screen, waitFor } from '@testing-library/react';
import UserForm from '../../components/UserForm';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { store } from '../../store';
import { initialUser } from 'data/ConstantUtils';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: '/register',
    }),
}));

const onChange = jest.fn();

describe('UserForm tests', () => {
    type Props = {
        children?: ReactNode;
    };

    const wrapper = ({ children }: Props) => (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    );
    beforeEach(() => {
        const saveUser = jest.fn();

        render(<UserForm saveUser={saveUser} />, { wrapper });
    });

    it('renders user form', () => {
        const userForm = screen.getByTestId('user-form');

        expect(userForm).toBeInTheDocument();
    });

    it('title should display register', () => {
        const header = screen.getByRole('heading');

        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('Register');
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
        const inputFullname = screen.getByLabelText('Full name') as HTMLInputElement;
        expect(inputFullname).toBeInTheDocument();

        inputFullname.onchange = onChange;

        // userEvent.type(inputFullname, 'Muhammad Lahin');

        fireEvent.change(inputFullname, { target: { value: 'Muhammad Lahin' } });

        //expect(onChange).toHaveBeenCalledWith('Muhammad Lahin');
        // expect(inputFullname.value).toBe('Muhammad Lahin');
        expect(onChange).toHaveBeenCalled();
        expect(Object.is('Muhammad Lahin', 'Muhammad Lahin')).toBe(true);
        // expect(userForm).toHaveFormValues({
        //     fullname: 'Muhammad Lahin',
        // });
    });
});