import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserForm from "../components/UserForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

const EditUser = () => {
    const { id } = useParams();
    const { user } = useAppSelector((state) => state.user);
    const { fetchUser, editUser, clearCurrentUser } = useAppDispatch();

    useEffect(() => {
        clearCurrentUser();
        if (id) fetchUser(id);
    }, []);

    if (!user) return null;

    return (
        <UserForm user={user} saveUser={editUser} register={false} />
    );
};

export default EditUser;
