export const getHeaders = () => {
    const state = localStorage.getItem('state');
    const token = state ? JSON.parse(state).users.loggedUser.token : null;

    return {
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`,
    };
};
