import React from 'react';
import styles from './AppHeader.module.css';
import { NavLink } from 'react-router-dom';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    const defaultTextStyle ='text text_type_main-default';
    const navLinkClass = ({isActive}) => isActive ? `${defaultTextStyle} ${styles.active} ml-2` : `${defaultTextStyle} ${styles.inactive} ml-2`

    return (
            <header className={`${styles.wrapper} mt-10`}>
                <nav className={styles.order_container}>
                    <div className={`${styles.burger_constructor} mr-2`}>
                        <BurgerIcon className='ml-4' type="primary" />
                        <NavLink to="/" className={navLinkClass}>Коструктор</NavLink>
                    </div>
                    <div className={styles.order_list}>
                        <ListIcon type="secondary" />
                        <NavLink to="/profile/orders " className={navLinkClass}>Лента заказов</NavLink>
                    </div>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.personal_account}>
                    <ProfileIcon type="secondary" />
                    <NavLink to="/profile" className={navLinkClass}>Личный кабинет</NavLink>
                </div>
            </header>
    );
};

export default AppHeader;