import { Loader } from "@/components/Loader";
import Message from "@/components/Message";
import UserForm from "@/components/UserForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getMessage } from "@/utils/handleMessage";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditUser = () => {
    const { id } = useParams();
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { fetchUser, editUser } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    useEffect(() => {
        if (id) fetchUser(id);
    }, []);

    return (
        loading ? <Loader />
            : <>
                {message && <Message message={message} />}
                <UserForm saveUser={editUser} editing={true} />
            </>
    );
};

export default EditUser;
