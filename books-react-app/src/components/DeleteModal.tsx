import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getModal } from '../store/uiSlice';

// const DeleteModal = () => {

//     const dispatch = useDispatch();
//     const { deleteBook, deleteUser } = useAppDispatch();
//     const { isOpen, type, data } = useAppSelector(getModal);

//     if (!isOpen || type !== "CONFIRM_DELETE") return null;

//     const handleConfirm = () => {
//         if (data.entity === "user") {
//             deleteUser(data.id);
//         } else if (data.entity === "book") {
//             deleteBook(data.id);
//         }
//         dispatch(closeModal());
//     };

//     const handleClose = () => dispatch(closeModal());

//     return (
//         <Modal size="sm" show={isOpen} onHide={handleClose} data-testid="delete-modal">
//             <Modal.Header closeButton>
//                 <Modal.Title>{`Delete ${data.entity}`}
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body className="text-center fw-bold">
//                 Are you sure?
//             </Modal.Body>
//             <Modal.Footer className="d-flex justify-content-around">
//                 <Button variant="secondary" onClick={handleClose}>
//                     Cancel
//                 </Button>
//                 <Button variant="danger" onClick={handleConfirm} data-testid="delete-item-btn">
//                     Delete
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };
import React, { useRef } from "react";
import Button from './ui/Button';

/**
 * Principle: all referenced components (Button) and hooks exist; remove Bootstrap modal usage in favor of Tailwind.
 */

const DeleteModal: React.FC = () => {
    const dispatch = useAppDispatch();
    // Adjust if your hook returns plain dispatch instead of bound actions:
    // const dispatch = useAppDispatch();
    const { isOpen, type, data } = useAppSelector(getModal);
    const dialogRef = useRef<HTMLDivElement | null>(null);

    if (!isOpen || type !== "CONFIRM_DELETE") return null;

    const handleConfirm = () => {
        // Replace with real delete logic (dispatch actions)
        // if (data.entity === "user") {
        //   dispatch(deleteUser(data.id));
        // } else if (data.entity === "book") {
        //   // dispatch(deleteBook(data.id));
        // }
        // dispatch(closeModal());
    };

    const handleClose = () => { };

    const handleOverlayClick = (e: React.MouseEvent) => {
    }
    //   const handleClose = () => dispatch(closeModal());

    //   const handleOverlayClick = (e: React.MouseEvent) => {
    //     if (e.target === e.currentTarget) handleClose();
    //   };

    //   useEffect(() => {
    //     const onKey = (e: KeyboardEvent) => {
    //       if (e.key === "Escape") handleClose();
    //     };
    //     window.addEventListener("keydown", onKey);
    //     dialogRef.current?.focus();
    //     return () => window.removeEventListener("keydown", onKey);
    //   }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            onClick={handleOverlayClick}
            data-testid="delete-modal"
        >
            <div
                ref={dialogRef}
                tabIndex={-1}
                className="w-full max-w-sm bg-white rounded-lg border border-surface-subtle shadow-lg p-6 space-y-5 outline-none"
            >
                <div className="flex items-start justify-between">
                    <h2 id="delete-modal-title" className="text-lg font-semibold">
                        Delete {data.entity}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-brand-700 hover:text-brand-900 px-2"
                        aria-label="Close dialog"
                    >
                        ×
                    </button>
                </div>

                <p className="text-sm text-brand-800 text-center font-medium">
                    Are you sure?
                </p>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="accent"
                        onClick={handleConfirm}
                        data-testid="delete-item-btn"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;