import React from 'react';
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function ModalOverlay({onClick}) {
    const navigate = useNavigate();
    const closeModal = () => {
        onClick ? onClick() : navigate('/');
    }
    return (<div onClick={closeModal} className={styles.overlay}/>);
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func,
}

export default ModalOverlay;