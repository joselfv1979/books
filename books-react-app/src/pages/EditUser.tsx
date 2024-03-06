import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import UserForm from "../components/UserForm";
import { Spinner } from "react-bootstrap";
import globalStyles from "../assets/scss/globalStyles.module.scss";
import { useParams } from "react-router-dom";
import { User } from "../types/User";
import { editUser, fetchUser } from "../store/userActions";
import { getMessage } from "utils/handleMessage";
import Message from "components/Message";

const EditUser = () => {
    const { id } = useParams();
    const { loading, errorMessage, successMessage } = useAppSelector((state) => state.user);
    const message = getMessage(errorMessage, successMessage);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) dispatch(fetchUser(id));
    }, [dispatch]);

    const saveUser = async (data: User) => {
        dispatch(editUser(data));
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
