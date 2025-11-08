import { Alert } from 'react-bootstrap';
import { useAppSelector } from '../hooks/redux-hooks';
import { clearNotification, getNotification } from '../store/notificationSlice';

const MESSAGE_TIMEOUT = 3000;

// TODO: Auto dismiss after timeout
// implement floating notifications

const Notification = () => {

    const notification = useAppSelector(getNotification);

    return (
        notification && (
            <Alert variant={notification.type === 'error' ? 'danger' : 'success'}
                data-testid="alert"
                className="w-100 text-center mb-1"
                onClose={() => clearNotification()}
                role="alert"
                dismissible>
                {notification.message}
            </Alert>
        ));
};

export default Notification;