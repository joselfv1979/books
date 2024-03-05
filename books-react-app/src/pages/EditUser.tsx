import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import Message from "../components/Message";
import UserForm from "../components/UserForm";
import { Spinner } from "react-bootstrap";
import globalStyles from "../assets/scss/globalStyles.module.scss";
import { useParams } from "react-router-dom";
import { getMessage } from "../utils/handleMessage";
import { User } from "../types/User";
import { editUser, fetchUser, removeUserMessage } from "../store/userActions";

const EditUser = () => {
    const { id } = useParams();

    const { loading, errorMessage, successMessage } = useAppSelector(
        (state) => state.user
    );

    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) dispatch(fetchUser(id));
    }, []);

    const saveUser = async (data: User) => {
        dispatch(editUser(data));
    };

    const cancelMessage = () => {
        dispatch(removeUserMessage());
    };

    return (
        loading ? <Spinner animation="border" className={globalStyles.spinner} />
            : <>
                {message && <Message message={message} cancelMessage={cancelMessage} />}
                <UserForm saveUser={saveUser} editing={true} />
            </>
    );
};

export default EditUser;
