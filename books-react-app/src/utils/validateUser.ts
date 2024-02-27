import { type Result } from '../types/Result';
import { type User } from '../types/User';

// Validate user function
export const validateUser = (user: User, editing?: boolean): Result<User, string> => {

    console.log(user);

    const { fullname, username, email, password } = user;

    const regex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!fullname) {
        return { success: false, message: 'Fullname is required' };
    } else if (username.length < 4) {
        return { success: false, message: 'Username must contains 4 characters at least' };
    } else if (!email) {
        return { success: false, message: 'Email is required' };
    } else if (!regex.test(email)) {
        return { success: false, message: 'Enter valid email' };
    } else if (!editing && (password.length < 4 || password.length > 9)) {
        return { success: false, message: 'passwords must be between 4 and 8 characters long' };
    }
    return { success: true, value: user };
};