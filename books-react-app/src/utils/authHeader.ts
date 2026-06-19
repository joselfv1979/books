import axios from 'axios';

axios.defaults.withCredentials = true;

export const getHeaders = () => {
    return {
        "Content-Type": "application/json",
    };
};
