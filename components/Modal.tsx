import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    // Allows passing JSX content
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    // Don't render if show is false
    if (!show) return null;

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="modal-content bg-white p-4 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">&times;</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
