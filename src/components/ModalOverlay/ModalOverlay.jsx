import React from 'react';
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({onClick}) {
    return (<div onClick={onClick} className={styles.overlay}/>);
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func,
}

export default ModalOverlay;