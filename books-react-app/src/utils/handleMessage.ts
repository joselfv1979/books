import { IMessage } from "../types/Message";

// Returns messages to views
export const getMessage = (errorMessage?: string, succesMessage?: string): IMessage | null => {
    if (errorMessage || succesMessage) {
        return {
            type: errorMessage ? 'ERROR' : 'SUCCESS',
            text: errorMessage ?? succesMessage,
        };
    }

    return null;
};
