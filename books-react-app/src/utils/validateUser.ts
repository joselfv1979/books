import { Result } from '../types/Result';

export const validateUser = (user: FormData, editingProfile?: boolean): Result<FormData> => {
    const data = Object.fromEntries(user.entries());
    const { fullname, username, email, password } = data;

    const regex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!fullname) {
        return { success: false, message: 'Fullname is required' };
    } else if (!username) {
        return { success: false, message: 'Username is required' };
    } else if (!email) {
        return { success: false, message: 'Email is required' };
    } else if (!regex.test(email.toString())) {
        return { success: false, message: 'Enter valid email' };
    } else if (!password && !editingProfile) {
        return { success: false, message: 'Password is required' };
    }
    return { success: true, value: user };
};
