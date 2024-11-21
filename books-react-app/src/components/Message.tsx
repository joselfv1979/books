import { useCallback, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/redux-hooks';
import { IMessage } from '../types/Message';

type Props = {
    message: IMessage;
};

const MESSAGE_TIMEOUT = 3000;

const Message = ({ message }: Props) => {

    const { removeUserMessage, removeBookMessage } = useAppDispatch();

    const handleRemoveMessage = useCallback(() => {
        removeUserMessage();
        removeBookMessage();
    }, [removeUserMessage, removeBookMessage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (message.type === 'SUCCESS') {
                handleRemoveMessage();
            }
        }, MESSAGE_TIMEOUT);

        return () => clearTimeout(timer); // Clear the timeout on unmount
    }, [message, handleRemoveMessage]); // Include message in dependency array

    const variant = message.type === 'ERROR' ? 'danger' : 'success';

    return (
        <Alert variant={variant}
            data-testid="alert"
            className="w-100 text-center mb-1"
            onClose={handleRemoveMessage}
            dismissible>
            {message.text}
        </Alert>
    );
};

export default Message;
