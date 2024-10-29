import React, { useEffect } from 'react';

export type ModalType = {
    children: React.ReactNode;
    modalState: ModalState;
    afterOpen?: () => void;
}

export enum ModalState {
    HIDDEN = 'hidden',
    VISIBLE = 'visible',
};

export const Modal: React.FC<ModalType> = ({ children, modalState, afterOpen }) => {

    useEffect(() => {
        afterOpen?.();
    }, [modalState]);
    
    return (
        <div className={`modal-wrapper modal-${modalState}`}>
            <div className='modal-content'>
                { children }
            </div>
        </div>
    )
}