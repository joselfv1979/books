import React from "react";
import { useAppSelector } from "../hooks/redux-hooks";

const AccountPage: React.FC = () => {
    const user = useAppSelector(s => s.user.user);
    return (
        <div className="space-y-6 max-w-xl">
            <h1 className="text-2xl font-semibold">Account</h1>
            {user ? (
                <div className="card space-y-2">
                    <p className="text-sm"><span className="font-medium">Name:</span> {user.username}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {user.email}</p>
                </div>
            ) : (
                <p className="text-sm text-brand-700">You are not logged in.</p>
            )}
        </div>
    );
};
export default AccountPage;