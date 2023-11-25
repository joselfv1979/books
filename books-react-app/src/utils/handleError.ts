import axios from 'axios';
import { Failure } from '../types/Result';

export const handleError = (error: unknown): Failure => {
    console.log({ error });

    if (axios.isAxiosError(error) && error.response?.data) {
        console.log(error.response);
        return { success: false, message: error.response.data };
        // if (error.response.data.errors) {
        //     return { success: false, message: error.response.data.errors[0].defaultMessage };
        // }
    }
    return { success: false, message: 'something went wrong!' };
};
