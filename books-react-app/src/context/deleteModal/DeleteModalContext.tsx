import { createContext, useContext } from 'react';
import { Book, initialBook } from '../../types/Book';
import { User } from '../../types/User';
import { initialUser } from '../../data/ConstantUtils';

export type DeleteModalContent = {
    book: Book;
    setBook: (book: Book) => void;
    user: User;
    setUser: (user: User) => void;
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
