import React, {useEffect} from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css'
import PropTypes from "prop-types";
import {createPortal} from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {useNavigate} from "react-router-dom";

const portalRoot = document.getElementById('react-modals');

function Modal({onClick, children, isShowHeader}) {
    const closeModal = () => {
        onClick ? onClick() : navigate('/');
    }
    const navigate = useNavigate();
    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') {
                onClick ? onClick() : navigate('/');
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [onClick, navigate]);
    const largeTextStyle ="text text_type_main-large";
    return (
        <>
            <div className={styles.wrapper}>
                <div className={`${styles.modal_header} ml-10 mt-10`}>
                    <div className={`${styles.modal_headerText} ${largeTextStyle}`}>
                        {isShowHeader && 'Детали ингредиента'}
                    </div>
                    <div onClick={closeModal} className={styles.close_btn}>
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
    onClick: PropTypes.func,
    children: PropTypes.element.isRequired,
    isShowHeader: PropTypes.bool.isRequired
}

const ModalPortal = ({onClick, children, isShowHeader}) => {
    return createPortal(<Modal onClick={onClick} isShowHeader={isShowHeader}>{children}</Modal>,portalRoot)}

ModalPortal.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.element.isRequired,
    isShowHeader: PropTypes.bool.isRequired
}

export default ModalPortal

