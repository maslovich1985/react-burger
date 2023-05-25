import React, {FC} from 'react';
import styles from "./ModalOverlay.module.css";
import {useNavigate} from "react-router-dom";

interface OwnProps {
    onClick?: () => void;
}

const ModalOverlay: FC<OwnProps> = ({onClick}) => {
    const navigate = useNavigate();
    const closeModal = () => {
        onClick ? onClick() : navigate('/');
    }
    return (<div onClick={closeModal} className={styles.overlay}/>);
}

export default ModalOverlay;