import React from 'react';
import styles from './AppHeader.module.css';
import {NavLink} from 'react-router-dom';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    const defaultTextStyle = 'text text_type_main-default';
    const navLinkClass = ({isActive}: { isActive: boolean }) => isActive ? `${defaultTextStyle} ${styles.active} ml-2` : `${defaultTextStyle} ${styles.inactive} ml-2`

    return (
        <header className={`${styles.wrapper} mt-10`}>
            <nav className={styles.order_container}>
                <NavLink to="/" className={navLinkClass}>
                    <div className={`${styles.burger_constructor} mr-2 ml-4`}>
                        <BurgerIcon type="primary"/>
                        <span className='ml-2'>
                            Коструктор
                        </span>
                    </div>
                </NavLink>
                <div className={styles.order_list}>
                    <ListIcon type="secondary"/>
                    <NavLink to="/profile/orders " className={navLinkClass}>
                        Лента заказов
                    </NavLink>
                </div>
            </nav>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <NavLink to="/profile" className={navLinkClass}>
                <div className={styles.personal_account}>
                    <ProfileIcon type="secondary"/>
                    <span className='ml-2'>
                        Личный кабинет
                    </span>
                </div>
            </NavLink>
        </header>
    );
};

export default AppHeader;