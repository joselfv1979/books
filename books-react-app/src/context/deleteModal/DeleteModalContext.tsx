import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type DeleteModalContent = {
    itemId: string;
    setItemId: Dispatch<SetStateAction<string>>;
    showDeleteModal: boolean;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
};

// Create a context with a more appropriate default value
const DeleteModalContext = createContext<DeleteModalContent | undefined>(undefined);

const useDeleteModalContext = () => {
    const context = useContext(DeleteModalContext);
    // if `undefined`, throw an error with the correct message
    if (context === undefined) {
        throw new Error('useDeleteModalContext must be used within a DeleteModalProvider');
    }
    return context;
};

export { DeleteModalContext, useDeleteModalContext };

