import {createPortal} from 'react-dom'
import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

const portalRoot = document.getElementById('react-modals');


const ModalPortal = ({onClick, children, isShowHeader}) => {
    return createPortal(<Modal onClick={onClick} isShowHeader={isShowHeader}>{children}</Modal>,portalRoot)}

ModalPortal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element,
    isShowHeader: PropTypes.bool
}

export default ModalPortal