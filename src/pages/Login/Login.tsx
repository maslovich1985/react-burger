import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import styles from "./Login.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {userLoginThunk} from "../../services/redux/actions/userActions";
import {isAuthorized} from '../../services/redux/selectors/userSelectors'
import {useAppDispatch, useAppSelector} from "../../services/redux/hooks";

function Login() {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(isAuthorized);
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isPassShown, setIsPassShown] = useState<boolean>(false);
    const prevPage = location.state ? location.state.from : '/';
    const handleUserLogin = useCallback((e: FormEvent) => {
        e.preventDefault();
        dispatch(userLoginThunk({email, password}))
    }, [email, password, dispatch]);

    useEffect(() => {
        if (isAuth) {
            navigate(prevPage);
        }
    }, [isAuth, navigate, prevPage]);

    const mediumTextStyle = 'text text_type_main-medium';
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';
    return (
        <div className={styles.wrapper}>
            <div className={`${mediumTextStyle} ${styles.header}`}>
                Вход
            </div>
            <form className={styles.form_container} onSubmit={handleUserLogin}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6 mt-6"
                    data-cy='input-email'
                />
                <Input
                    type={isPassShown ? 'text' : 'password'}
                    placeholder={'Пароль'}
                    icon={isPassShown ? 'HideIcon' : 'ShowIcon'}
                    onChange={(e) => setPassword(e.target.value)}
                    onIconClick={() => setIsPassShown(!isPassShown)}
                    value={password}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6 mt-6 mb-6"
                    data-cy='input-password'
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={`${styles.content_text} ${inactiveTextStyle} mt-20`}>
                <p>Вы - новый пользователь?{' '}
                    <NavLink to='/register' className={styles.colored_text}>
                        Зарегистрироваться
                    </NavLink>
                </p>
            </div>
            <div className={`${styles.content_text} ${inactiveTextStyle} mt-4`}>
                <p>Забыли пароль?{' '}
                    <NavLink to='/forgot-password' className={styles.colored_text}>
                        Восстановить пароль
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default Login;
