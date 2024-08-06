import EditUser from '@/pages/EditUser';
import * as actions from '@/store/userActions';
import '@testing-library/jest-dom/extend-expect';
import { screen, waitFor } from '@testing-library/react';
import { user1, userState } from '../utils/data';
import { customRender } from '../utils/test-utils';

describe('EditUser userForm', () => {

    beforeEach(() =>
        customRender(<EditUser />,
            { preloadedState: { user: userState } }));

    it('renders user form', () => {
        const userForm = screen.getByTestId('user-form');

        expect(userForm).toBeInTheDocument();
    });

});

describe('EditUser loading state', () => {

    beforeEach(() => {
        const loadingState = { ...userState, loading: true };
        customRender(<EditUser />, { preloadedState: { user: loadingState } })
    });

    it('renders the loader if the loading state is true', () => {
        const loader = screen.getByTestId('loader');

        expect(loader).toBeInTheDocument();
    });
});

describe('EditUser message', () => {

    beforeEach(() => {
        const messageState = { ...userState, loading: false, successMessage: 'User added successfully' };
        customRender(<EditUser />, { preloadedState: { user: messageState } })
    });

    it("should display a message when it's received from the state", () => {
        const message = screen.getByText(/user added successfully/i);

        expect(message).toBeInTheDocument();
    });
});

describe('EditUser params', () => {

    const userId = '1';

    beforeEach(() => {
        const user1State = { ...userState, loading: false, user: user1 };
        customRender(<EditUser />,
            {
                preloadedState: { user: user1State },
                routerHistory: [`/users/${userId}`]
            })
    });

    it('should call function fetchUser when receives user id param', async () => {
        const fetchUserSpy = jest.spyOn(actions, 'fetchUser');
        waitFor(() => expect(fetchUserSpy).toHaveBeenCalled());
    });

    it('form should contain user values', () => {

        const userForm = screen.getByTestId('user-form');

        expect(userForm).toHaveFormValues({
            fullname: 'Ana',
            username: 'ana',
            email: 'ana@gmail.com',
        });
    });
});