import React, {useState} from 'react';
import styles from "./Profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {logoutUser, updateUserProfile} from "../../services/redux/actions/userActions";
import {email, name} from "../../services/redux/selectors/userSelectors";
import {useAppDispatch, useAppSelector} from "../../services/redux/hooks";
import {UserAction} from "../../services/redux/reducers/userReducer";

function Profile() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userEmail = useAppSelector(email);
    const userName = useAppSelector(name);
    const [login, setLogin] = useState<string>(userName);
    const [mail, setMail] = useState<string>(userEmail);
    const isShowButtons = userName !== login || userEmail !== mail;
    const [isPassShown, setIsPassShown] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const mediumTextStyle = 'text text_type_main-medium';
    const inactiveMediumTextStyle = 'text text_type_main-medium text_color_inactive';
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';
    const profileTypes = ['Профиль', 'История заказов', 'Выход'];
    const profilePanel = {
        profile: 'Профиль',
        orders: 'История заказов',
        logout: 'Выход'
    }
    const [currentTab, setCurrentTab] = useState<string>(profileTypes[0]);
    const activeTab = (tab: string) => {
        if (currentTab === tab) {
            return `${styles.tab} ${mediumTextStyle}`
        }
        return `${styles.tab} ${inactiveMediumTextStyle}`
    }
    const tabHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const type = (e.target as HTMLElement).innerText
        setCurrentTab(type);
        if (type === profilePanel.orders) {
            navigate('/profile/orders');
        }
        if (type === profilePanel.logout) {
            Promise.resolve(dispatch(logoutUser() as unknown as UserAction)).then(() => navigate('/'));
        }
    }
    const cancelHandler = () => {
        setLogin(userName);
        setMail(userEmail);
    }

    const saveHandler = () => {
        // @ts-ignore
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