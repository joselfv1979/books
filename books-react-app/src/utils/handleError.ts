import axios from 'axios';

// Error handling function
export const handleError = (error: unknown): string => {

    if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        return error.response?.data.errors[0];
    }

    return "Couldn't perform action, try it later!";
};
