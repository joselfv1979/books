import React, { ReactNode, useState } from 'react';
import { DeleteModalContext } from './DeleteModalContext';

type Props = {
    children: ReactNode;
};

export const DeleteModalContextProvider = ({ children }: Props) => {
    const [itemId, setItemId] = useState<string>('');
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const value = React.useMemo(
        () => ({
            itemId,
            setItemId,
            showDeleteModal,
            setShowDeleteModal,
        }),
        [itemId, showDeleteModal],
    );

    return <DeleteModalContext.Provider value={value}>{children}</DeleteModalContext.Provider>;
};
