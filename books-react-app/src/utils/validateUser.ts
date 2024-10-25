import { Dispatch, SetStateAction } from 'react';
import { type User } from '../types/User';

export type UserFormErrors = {
    fullname?: string,
    username?: string,
    email?: string,
    password?: string,
}

type Props = {
    values: User;
    errors: UserFormErrors;
    setErrors: Dispatch<SetStateAction<UserFormErrors>>;
    register: boolean
}

// Validate user function
export const validateUser = ({ values, errors, setErrors, register }: Props) => {

    const { fullname, username, email, password } = values;

    const regex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    let isValid = true;

    errors.fullname = fullname ? undefined : 'Fullname is required';
    errors.username = username ? undefined : 'Username must contains 4 characters at least';

    if (!email) {
        errors.email = 'Email is required';
    } else if (!regex.test(email)) {
        errors.email = 'Enter valid email';
    }

    if (register && (password.length < 4 || password.length > 9)) errors.password = 'Password must be between 4 and 8 characters long';

    setErrors({ ...errors });

    for (const key in errors) {
        if (errors[key as keyof UserFormErrors] !== undefined) {
            isValid = false;
            break;
        }
    }

    return { isValid };
};