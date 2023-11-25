import React, { ReactNode } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddUser from '../../pages/AddUser';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('user-form', () => {
    type Props = {
        children?: ReactNode;
    };

    const wrapper = ({ children }: Props) => (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    );

    beforeEach(() => {
        render(<AddUser />, { wrapper });
    });
    it('renders user form', () => {
        const userForm = screen.getByTestId('user-form');

        expect(userForm).toBeInTheDocument();
    });
});
