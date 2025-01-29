import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import Message from "../components/Message";
import UserForm from "../components/UserForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getMessage } from "../utils/handleMessage";

const EditUser = () => {
    const { id } = useParams();
    const { user, loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { fetchUser, editUser } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    useEffect(() => {
        if (id) fetchUser(id);
    }, []);

    return (
        <>
            {loading && <Loader />}
            {message && <Message message={message} />}
            {user && <UserForm user={user} saveUser={editUser} register={false} />}
        </>
    );
};

export default EditUser;
