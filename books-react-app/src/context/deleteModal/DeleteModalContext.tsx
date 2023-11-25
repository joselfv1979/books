import { createContext, useContext } from 'react';
import { IBook, initialBook } from '../../types/Book';
import { initialUser, IUser } from '../../types/User';

export type DeleteModalContent = {
    book: IBook;
    setBook: (book: IBook) => void;
    user: IUser;
    setUser: (user: IUser) => void;
    showDeleteModal: boolean;
    setShowDeleteModal: (showDeleteModal: boolean) => void;
};

const DeleteModalContext = createContext<DeleteModalContent>({
    book: initialBook,
    setBook: () => null,
    user: initialUser,
    setUser: () => null,
    showDeleteModal: false,
    setShowDeleteModal: () => true,
});

const useDeleteModalContext = () => {
    const context = useContext(DeleteModalContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useUserContext was used outside of its Provider');
    }

    return context;
};

export { DeleteModalContext, useDeleteModalContext };
