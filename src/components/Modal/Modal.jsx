import React from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css'
import PropTypes from "prop-types";

function Modal({onClick, children, isShowHeader}) {
    const largeTextStyle ="text text_type_main-large";
    return (
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
    );
}

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element,
    isShowHeader: PropTypes.bool
}

export default Modal;