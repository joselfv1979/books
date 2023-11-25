import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from '../scss/globalStyles.module.scss';

type Props = {
    error: string | null;
    success?: string | null;
    cancelMessage: () => void;
};

const Message = ({ error, success, cancelMessage }: Props) => {
    const variant = error ? 'danger' : 'success';

    return (
        <Alert variant={variant} className={styles.alert} onClose={cancelMessage} dismissible>
            {error || success}
        </Alert>
    );
};

export default Message;
