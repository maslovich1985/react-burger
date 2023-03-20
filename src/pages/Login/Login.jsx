import React, {useState, useCallback, useEffect} from 'react';
import styles from "./Login.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {userLoginThunk} from "../../services/redux/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {isAuthorized} from '../../services/redux/selectors/userSelectors'

function Login() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthorized);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPassShown, setIsPassShown] = useState(false);
    const handleUserLogin = useCallback((e) => {
        e.preventDefault();
       dispatch(userLoginThunk({email, password}));
    }, [email, password, dispatch]);
    
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
