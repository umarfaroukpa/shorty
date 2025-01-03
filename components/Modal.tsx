import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    // Allows passing JSX content
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }: ModalProps) => {
    // Don't render if show is false
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
