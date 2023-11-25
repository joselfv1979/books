import React, { ReactNode, useState } from 'react';
import { IBook, initialBook } from '../../types/Book';
import { initialUser, IUser } from '../../types/User';
import { DeleteModalContext } from './DeleteModalContext';

type Props = {
    children: ReactNode;
};

export const DeleteModalContextProvider = ({ children }: Props) => {
    const [book, setBook] = useState<IBook>(initialBook);
    const [user, setUser] = useState<IUser>(initialUser);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    return (
        <DeleteModalContext.Provider value={{ book, setBook, user, setUser, showDeleteModal, setShowDeleteModal }}>
            {children}
        </DeleteModalContext.Provider>
    );
};
