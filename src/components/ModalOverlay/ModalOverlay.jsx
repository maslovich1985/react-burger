import React from 'react';
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({onClick, onKeyPress}) {
    return (<div onKeyPress={onKeyPress} onClick={onClick} className={styles.overlay}/>);
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
}

export default ModalOverlay;