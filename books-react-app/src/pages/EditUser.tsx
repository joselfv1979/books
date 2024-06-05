import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import UserForm from "../components/UserForm";
import { Spinner } from "react-bootstrap";
import globalStyles from "../assets/scss/globalStyles.module.scss";
import { useParams } from "react-router-dom";
import { getMessage } from "utils/handleMessage";
import Message from "components/Message";
import { User } from "types/User";

const EditUser = () => {
    const { id } = useParams();
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const { fetchUser, editUser } = useAppDispatch();

    // Obtains a custom message object
    const message = getMessage(errorMessage, successMessage);

    useEffect(() => {
        if (id) fetchUser(id);
    }, []);

    const saveUser = async (data: User) => {
        editUser(data);
    };

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} />}
                <UserForm saveUser={saveUser} editing={true} />
            </>
    );
};

export default EditUser;
