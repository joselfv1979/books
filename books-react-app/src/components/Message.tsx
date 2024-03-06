import { Alert } from 'react-bootstrap';
import { IMessage } from '../types/Message';
import { useAppDispatch } from 'hooks/redux-hooks';
import { removeBookMessage } from 'store/bookActions';
import { removeUserMessage } from 'store/userActions';

type Props = {
    message: IMessage;
};

const Message = ({ message }: Props) => {

    const dispatch = useAppDispatch();

    const removeMessage = () => {
        dispatch(removeUserMessage());
        dispatch(removeBookMessage());
    };
    const variant = message.type === 'ERROR' ? 'danger' : 'success';

    return (
        <Alert variant={variant} className="w-100 text-center m-0" onClose={removeMessage} dismissible>
            {message.text}
        </Alert>
    );
};

export default Message;
