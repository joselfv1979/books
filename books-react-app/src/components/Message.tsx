import React from 'react';
import { Alert } from 'react-bootstrap';
import { IMessage } from '../types/Message';
import styles from '../assets/scss/globalStyles.module.scss';

type Props = {
    message: IMessage;
    cancelMessage: () => void;
};

const Message = ({ message, cancelMessage }: Props) => {
    const variant = message.type === 'ERROR' ? 'danger' : 'success';

    return (
        <Alert variant={variant} className={styles.alert} onClose={cancelMessage} dismissible>
            {message.text}
        </Alert>
    );
};

export default Message;
