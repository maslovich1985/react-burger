import React, {useEffect, useState} from 'react';
import styles from './BurgerConstructor.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import DataPropTypes from "../../utils/prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalPortal from "../ModalPortal/ModalPortal";
import OrderDetails from "../OrderDetails/OrderDetails";

function BurgerConstructor({data}) {
    const [isModalOpened, setIsModalOpened] = useState(false);
    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') {
                setIsModalOpened(false);
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])
    const bunBottom = data[0];
    const ingredients = [...data, bunBottom];
    const burgerCost = ingredients.map((ingredient) => ingredient.price).reduce((acc, cur) => acc + cur, 0);
    const digitsTextStyle = 'text text_type_digits-medium';

    const openModal = () => setIsModalOpened(true);
    const closeModal = () => setIsModalOpened(false);
    return (
        <section className={styles.wrapper}>
            <div className={`${styles.burger_constructor} mt-25 mr-4`}>
                <BurgerIngredients data={ingredients}/>
            </div>
            <div className={`${styles.checkout} mt-10 mr-4`}>
                <div className={`${styles.price} mr-10`}>
                    <div className={`${digitsTextStyle} mr-2`}>
                        {burgerCost}
                    </div>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={openModal}>
                    Оформить заказ
                </Button>
                {isModalOpened && (
                    <>
                        <ModalPortal onClick={closeModal} isShowHeader={false}>
                            <OrderDetails/>
                        </ModalPortal>
                        <ModalOverlay onClick={closeModal}/>
                    </>
                )}
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(DataPropTypes)
}

export default BurgerConstructor;