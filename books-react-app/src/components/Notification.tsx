import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { clearNotification, getNotification } from '../store/notification';
import { useDispatch } from 'react-redux';

const MESSAGE_TIMEOUT = 3000;


// Floating, auto-dismissable notification
const Notification = () => {
    const notification = useAppSelector(getNotification);
    const dispatch = useDispatch();

    if (!notification) return null;

    const isError = notification.type === 'error';
    const bgColor = isError ? 'bg-red-100 border-red-400 text-red-800' : 'bg-green-100 border-green-400 text-green-800';

    return (
        <div
            data-testid="alert"
            role="alert"
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-3xl px-4 py-3 border ${bgColor} rounded shadow-lg flex items-center justify-between`}
        >
            <span className="flex-1 text-center">{notification.message}</span>
            <button
                onClick={() => dispatch(clearNotification())}
                className="ml-4 text-xl font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Dismiss"
            >
                &times;
            </button>
        </div>
    );
};

export default Notification;