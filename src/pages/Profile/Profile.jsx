import React, {useState} from 'react';
import styles from "./Profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {logoutUser, updateUserProfile} from "../../services/redux/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {email, name} from "../../services/redux/selectors/userSelectors";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userEmail = useSelector(email);
    const userName = useSelector(name);
    const [login, setLogin] = useState(userName);
    const [mail, setMail] = useState(userEmail);
    const isShowButtons = userName !== login || userEmail !== mail;
    const [isPassShown, setIsPassShown] = useState(false);
    const [password, setPassword] = useState('');
    const mediumTextStyle = 'text text_type_main-medium';
    const inactiveMediumTextStyle = 'text text_type_main-medium text_color_inactive';
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';
    const profileTypes = ['Профиль', 'История заказов', 'Выход'];
    const profilePanel = {
        profile: 'Профиль',
        orders: 'История заказов',
        logout: 'Выход'
    }
    const [currentTab, setCurrentTab] = useState(profileTypes[0]);
    const activeTab = (tab) => {
        if (currentTab === tab) {
            return `${styles.tab} ${mediumTextStyle}`
        }
        return `${styles.tab} ${inactiveMediumTextStyle}`
    }
    const tabHandler = (e) => {
        const type = e.target.innerText
        setCurrentTab(type);
        if (type === profilePanel.orders) {
            navigate('/profile/orders');
        }
        if (type === profilePanel.logout) {
            Promise.resolve(dispatch(logoutUser())).then(() => navigate('/login'));
        }
    }
    const cancelHandler = () => {
        setLogin(userName);
        setMail(userEmail);
    }

    const saveHandler = () => {
        dispatch(updateUserProfile(login, mail));
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs_container}>
                {profileTypes.map((type, i) => (
                    <div
                        className={activeTab(type)}
                        key={i}
                        onClick={tabHandler}
                    >
                        {type}
                    </div>
                ))}
                <div className={`${styles.tabs_info} ${inactiveTextStyle} mt-20`}>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </div>
            <div className={`${styles.input_container} ml-15`}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    icon={'EditIcon'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    icon={'EditIcon'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6 mt-6"
                />
                <Input
                    type={isPassShown ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={'Пароль'}
                    onIconClick={() => setIsPassShown(!isPassShown)}
                    icon={isPassShown ? 'HideIcon' : 'ShowIcon'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-6 mt-6"
                />
                {isShowButtons && (
                    <div className={`${styles.buttons_container} ml-6`}>
                        <Button
                            htmlType='button'
                            type='primary'
                            size='medium'
                            onClick={saveHandler}
                        >
                            Сохранить
                        </Button>
                        <Button
                            htmlType='button'
                            type='primary'
                            size='medium'
                            onClick={cancelHandler}
                        >
                            Отмена
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;