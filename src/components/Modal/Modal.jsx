import React, {useEffect} from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css'
import PropTypes from "prop-types";
import {createPortal} from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const portalRoot = document.getElementById('react-modals');

function Modal({onClick, children, isShowHeader}) {
    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') {
                onClick();
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [onClick]);
    const largeTextStyle ="text text_type_main-large";
    return (
        <>
            <div className={styles.wrapper}>
                <div className={`${styles.modal_header} ml-10 mt-10`}>
                    <div className={`${styles.modal_headerText} ${largeTextStyle}`}>
                        {isShowHeader && 'Детали ингредиента'}
                    </div>
                    <div onClick={onClick} className={styles.close_btn}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                {children}
            </div>
            <ModalOverlay onClick={onClick}/>
        </>
    );
}

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    isShowHeader: PropTypes.bool.isRequired
}

const ModalPortal = ({onClick, children, isShowHeader}) => {
    return createPortal(<Modal onClick={onClick} isShowHeader={isShowHeader}>{children}</Modal>,portalRoot)}

ModalPortal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    isShowHeader: PropTypes.bool.isRequired
}

export default ModalPortal

