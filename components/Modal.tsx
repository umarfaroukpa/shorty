import React from 'react';
import { ReactNode } from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
    if (!show) return null;

    return (
        <div className="fixed inset-3 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md max-w-sm w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm">
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
