import { Alert } from 'react-bootstrap';
import { IMessage } from '../types/Message';
import { useAppDispatch } from 'hooks/redux-hooks';

type Props = {
    message: IMessage;
};

const Message = ({ message }: Props) => {

    const { removeUserMessage, removeBookMessage } = useAppDispatch();

    const removeMessage = () => {
        removeUserMessage();
        removeBookMessage();
    };
    const variant = message.type === 'ERROR' ? 'danger' : 'success';

    return (
        <Alert variant={variant} className="w-100 text-center m-0" onClose={removeMessage} dismissible>
            {message.text}
        </Alert>
    );
};

export default Message;
