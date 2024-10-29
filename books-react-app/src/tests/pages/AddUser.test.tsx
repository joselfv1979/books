import { screen } from '@testing-library/react';
import AddUser from '../../pages/AddUser';
import { userState } from '../utils/data';
import { customRender } from '../utils/test-utils';

describe('AddUser userForm', () => {

    beforeEach(() =>
        customRender(<AddUser />,
            { preloadedState: { user: userState } }));

    it('renders user form', () => {
        const userForm = screen.getByTestId('user-form');

        expect(userForm).toBeInTheDocument();
    });
});

describe('AddUser loading state', () => {

    beforeEach(() => {
        const loadingState = { ...userState, loading: true };
        customRender(<AddUser />, { preloadedState: { user: loadingState } })
    });

    it('renders the loader if the loading state is true', () => {
        const loader = screen.getByTestId('loader');

        expect(loader).toBeInTheDocument();
    });
});

describe('AddUser message', () => {

    beforeEach(() => {
        const messageState = { ...userState, loading: false, successMessage: 'User added successfully' };
        customRender(<AddUser />, { preloadedState: { user: messageState } })
    });

    it("should display a message when it's received from the state", () => {
        const message = screen.getByText(/user added successfully/i);

        expect(message).toBeInTheDocument();
    });
});




