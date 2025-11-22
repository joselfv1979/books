import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialUser } from "../data/ConstantUtils";
import { User } from "../types/User";
import { ROUTES } from "../utils/constants";
import { UserFormErrors, validateUser } from "../utils/validateUser";
import LoadFile from "./LoadFile";
import Button from "./ui/Button";

type Props = {
    user: User | null;
    saveUser: (data: User) => void;
    register?: boolean;
};

const UserForm: React.FC<Props> = ({ user, saveUser, register = true }) => {
    const [values, setValues] = useState<User>(user ?? initialUser);
    const [errors, setErrors] = useState<UserFormErrors>({});
    const fileInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setValues(prev => ({ ...prev, image: file }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { isValid } = validateUser({ values, errors, setErrors, register });
        if (isValid) saveUser(values);
    };

    const toBooks = () => navigate(ROUTES.ALL_BOOKS);
    const toLogin = () => navigate(ROUTES.LOGIN);

    return (
        <form
            onSubmit={handleSubmit}
            data-testid="user-form"
            className="card max-w-md mx-auto space-y-8 p-8"
        >
            <h3 className="text-center text-2xl font-semibold">
                {register ? "Register" : "Edit profile"}
            </h3>
            <span className="text-[11px] text-brand-700 block text-center">
                Required fields *
            </span>

            <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                    Username *
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={values.username}
                    placeholder="Enter username"
                    onChange={handleChange}
                    className="input"
                    required
                />
                {errors.username && <p className="text-[11px] text-danger-500">{errors.username}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                    Email *
                </label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={values.email}
                    placeholder="Enter email"
                    onChange={handleChange}
                    className="input"
                    required
                />
                {errors.email && <p className="text-[11px] text-danger-500">{errors.email}</p>}
            </div>

            {register && (
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium uppercase tracking-wide text-brand-700">
                        Password *
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="off"
                        value={values.password}
                        placeholder="Password"
                        onChange={handleChange}
                        className="input"
                        required
                        minLength={6}
                    />
                    {errors.password && <p className="text-[11px] text-danger-500">{errors.password}</p>}
                    <p className="text-[11px] text-brand-600">You can add a photo later in your profile.</p>
                </div>
            )}

            {!register && (
                <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-wide text-brand-700">Photo</label>
                    <LoadFile fileInput={fileInput} image={values.imagePath} handleFile={handleFile} />
                </div>
            )}

            {register && (
                <div className="text-center space-y-2">
                    <p className="text-sm text-brand-700">Already have an account?</p>
                    <Button
                        type="button"
                        variant="outline"
                        className="text-sm px-4 py-1 w-full"
                        onClick={toLogin}
                    >
                        Login here
                    </Button>
                </div>
            )}

            {/* Actions aligned like LoginForm (vertical stack, full width) */}
            <div className="flex flex-col gap-4">
                <Button type="submit" variant="primary" className="w-full">
                    Submit
                </Button>
                {!register && (
                    <Button type="button" variant="outline" onClick={toBooks} className="w-full">
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};

export default UserForm;
