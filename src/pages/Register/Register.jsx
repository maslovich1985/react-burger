import React, {useState, useEffect, useCallback} from 'react';
import styles from "./Register.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {userRegisterThunk} from "../../services/redux/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {isAuthorized} from '../../services/redux/selectors/userSelectors'


function Register() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthorized);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPassShown, setIsPassShown] = useState(false);
    const handleUserRegister = useCallback((e) => {
        e.preventDefault();
        dispatch(userRegisterThunk({name, email, password}));
    }, [name, email, password, dispatch])

    useEffect(() => {
      if (isAuth) {
          navigate('/');
      }
    }, [isAuth, navigate]);

    const mediumTextStyle = 'text text_type_main-medium';
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';
    return (
        <div className={styles.wrapper}>
            <div className={`${mediumTextStyle} ${styles.header}`}>
                Регистрация
            </div>
            <form className={styles.form_container} onSubmit={handleUserRegister}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    error={false}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6 mt-6"
                />
                <Input
                    type={'email'}
                    placeholder={'E-email'}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6 mt-6"
                />
                <Input
                    type={isPassShown ? 'text' : 'password'}
                    placeholder={'Пароль'}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    icon={isPassShown ? 'HideIcon' : 'ShowIcon'}
                    onIconClick={() => setIsPassShown(!isPassShown)}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6 mt-6 mb-6"
                />
                <Button disabled={!(email && name && password)} htmlType="submit" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
            <div className={`${styles.content_text} ${inactiveTextStyle} mt-20`}>
                <p>Уже зарегистрированы? <NavLink to='/login' className={styles.colored_text}>Войти</NavLink></p>
            </div>
        </div>
    );
}

export default Register;
