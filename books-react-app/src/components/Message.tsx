import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/redux-hooks';
import { IMessage } from '../types/Message';

type Props = {
    message: IMessage;
};

const Message = ({ message }: Props) => {

    const { removeUserMessage, removeBookMessage } = useAppDispatch();

    const removeMessage = () => {
        removeUserMessage();
        removeBookMessage();
    };

    useEffect(() => {
        setTimeout(() => {
            message.type === 'SUCCESS' && removeMessage();
        }, 3000)
    }, []);

    const variant = message.type === 'ERROR' ? 'danger' : 'success';

    return (
        <Alert variant={variant} data-testid="alert" className="w-100 text-center mb-1" onClose={removeMessage} dismissible>
            {message.text}
        </Alert>
    );
};

export default Message;
