import axios from 'axios';

// Error handling function
export const handleError = (error: unknown): string => {

    if (axios.isAxiosError(error)) {
        return error.response?.data.errors[0] ?? "Couldn't perform action, try it later!";
    }

    return "Couldn't perform action, try it later!";
};
