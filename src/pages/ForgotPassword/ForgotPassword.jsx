import React, {useState} from 'react';
import styles from "./ForgotPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetUserPassword} from "../../services/redux/actions/userActions";

function ForgotPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRecoverPass = (e) => {
        e.preventDefault();
        Promise.resolve(dispatch(resetUserPassword(email)))
            .then(() => {
                navigate('/reset-password', { state: { from: '/forgot-password' } })
            })
    }
    const mediumTextStyle = 'text text_type_main-medium';
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';
    return (
        <div className={styles.wrapper}>
            <div className={`${mediumTextStyle} ${styles.header}`}>
                Восстановление пароля
            </div>
            <form className={styles.form_container} onSubmit={handleRecoverPass}>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    error={false}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6 mt-6 mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <div className={`${styles.content_text} ${inactiveTextStyle} mt-20`}>
                <p>Вспомнили пароль? <NavLink to='/login' className={styles.colored_text}>Войти</NavLink></p>
            </div>
        </div>
    );
}

export default ForgotPassword;