import React from 'react';
import styles from './AppHeader.module.css'
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';
    const defaultTextStyle ='text text_type_main-default'
    return (
            <header className={`${styles.wrapper} mt-10`}>
                <nav className={styles.order_container}>
                    <div className={`${styles.burger_constructor} mr-2`}>
                        <BurgerIcon className='ml-4' type="primary" />
                        <span className={`${defaultTextStyle} ml-2`}>Коструктор</span>
                    </div>
                    <div className={styles.order_list}>
                        <ListIcon type="secondary" />
                        <span className={`${inactiveTextStyle} ml-2`}>Лента заказов</span>
                    </div>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.personal_account}>
                    <ProfileIcon type="secondary" />
                    <span className={`${inactiveTextStyle} ml-2`}>Личный кабинет</span>
                </div>
            </header>
    );
};

export default AppHeader;