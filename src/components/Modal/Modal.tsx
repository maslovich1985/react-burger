import React, {FC, ReactElement, useCallback, useEffect} from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css'
import {createPortal} from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {useNavigate} from "react-router-dom";

const portalRoot = document.getElementById('react-modals') as HTMLElement;

interface ModalProps {
    onClick?: () => void;
    children: ReactElement;
    isShowHeader: boolean;
}

const Modal: FC<ModalProps> = ({onClick, children, isShowHeader}) => {
    const navigate = useNavigate();
    const closeModal = useCallback(() => {
        onClick ? onClick() : navigate(-1);
    }, [onClick, navigate]);
    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                closeModal();
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [onClick, navigate, closeModal]);
    const largeTextStyle = "text text_type_main-large";
    return (
        <>
            <div className={styles.wrapper} data-cy='modal-wrapper'>
                <div className={`${styles.modal_header} ml-10 mt-10`}>
                    <div className={`${styles.modal_headerText} ${largeTextStyle}`}>
                        {isShowHeader && 'Детали ингредиента'}
                    </div>
                    <div onClick={closeModal} className={styles.close_btn} data-cy='modal-close-icon'>
                        <CloseIcon type="primary"/>
                    </div>
                </div>
                {children}
            </div>
            <ModalOverlay onClick={onClick}/>
        </>
    );
}

interface PortalProps {
    onClick?: () => void;
    children: ReactElement;
    isShowHeader: boolean;
}

const ModalPortal: FC<PortalProps> = ({onClick, children, isShowHeader}) => {
    return createPortal(<Modal onClick={onClick} isShowHeader={isShowHeader}>{children}</Modal>, portalRoot)
}

export default ModalPortal

