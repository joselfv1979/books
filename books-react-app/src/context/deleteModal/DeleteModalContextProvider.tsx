import React, { ReactNode, useState } from 'react';
import { Book, initialBook } from '../../types/Book';
import { User } from '../../types/User';
import { DeleteModalContext } from './DeleteModalContext';
import { initialUser } from '../../data/ConstantUtils';

type Props = {
    children: ReactNode;
};

export const DeleteModalContextProvider = ({ children }: Props) => {
    const [book, setBook] = useState<Book>(initialBook);
    const [user, setUser] = useState<User>(initialUser);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const value = React.useMemo(
        () => ({
            book,
            setBook,
            user,
            setUser,
            showDeleteModal,
            setShowDeleteModal,
        }),
        [book, user, showDeleteModal],
    );

    return <DeleteModalContext.Provider value={value}>{children}</DeleteModalContext.Provider>;
};
