import React, {useState} from 'react';
import styles from "./ResetPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {resetPassWithCode} from "../../services/redux/actions/userActions";
import {useDispatch} from "react-redux";

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPassShown, setIsPassShown] = useState(false);
    const [password, setPassword] = useState('');
    const [isCodeShown, setIsCodeShown] = useState(false);
    const [code, setCode] = useState('');
    const mediumTextStyle = 'text text_type_main-medium';
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';

    const handleRecoverPassWithCode = (e) => {
        e.preventDefault();
        Promise.resolve(dispatch(resetPassWithCode(password, code)))
            .then(() => {
                navigate('/')
            })
    }

    return (
        <div className={styles.wrapper}>
            <div className={`${mediumTextStyle} ${styles.header}`}>
                Восстановление пароля
            </div>
            <form className={styles.form_container} onSubmit={handleRecoverPassWithCode}>
                <Input
                    type={isPassShown ? 'text' : 'password'}
                    placeholder={'Введите новый пароль'}
                    error={false}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    errorText={'Ошибка'}
                    onIconClick={() => setIsPassShown(!isPassShown)}
                    icon={isPassShown ? 'HideIcon' : 'ShowIcon'}
                    size={'default'}
                    extraClass="ml-6 mt-6"
                />
                <Input
                    type={isCodeShown ? 'text' : 'password'}
                    placeholder={'Введите код из письма'}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onIconClick={() => setIsCodeShown(!isCodeShown)}
                    icon={isCodeShown ? 'HideIcon' : 'ShowIcon'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6 mt-6 mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </form>
            <div className={`${styles.content_text} ${inactiveTextStyle} mt-20`}>
                <p>Вспомнили пароль? <NavLink to='/login' className={styles.colored_text}>Войти</NavLink></p>
            </div>
        </div>
    );
}

export default ResetPassword;