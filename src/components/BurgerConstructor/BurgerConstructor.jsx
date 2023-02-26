import React, {useEffect, useState} from 'react';
import styles from './BurgerConstructor.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalPortal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import {getOrderThunk} from "../../utils/services/redux/actions/orderActions";
import { useDrop } from "react-dnd";
import {addIngredientInBurger} from "../../utils/services/redux/actions/burgerIngredientsActions";
import {burgerIngredients} from "../../utils/services/redux/selectors/burgerIngredientSelector";
import {increaseIngredientCounter} from "../../utils/services/redux/actions/ingredientsListActions";

function BurgerConstructor() {
    const dispatch = useDispatch();
    const burgerData = useSelector(burgerIngredients);

    const [, dropTarget] = useDrop({
        accept: ['bun', 'main', 'sauce'],
        drop(itemId) {
            dispatch(addIngredientInBurger(itemId));
            dispatch(increaseIngredientCounter(itemId));
        },
    });
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
    const burgerCost = burgerData.map((ingredient) => ingredient?.price).reduce((acc, cur) => acc + cur, 0);
    const digitsTextStyle = 'text text_type_digits-medium';

    const openModal = () => {
        dispatch(getOrderThunk(burgerData));
        setIsModalOpened(true);
    }
    const closeModal = () => setIsModalOpened(false);
    return (<section ref={dropTarget} className={styles.wrapper}>
                    <div className={`${styles.burger_constructor} mt-25 mr-4`}>
                        { burgerData.length !== 0 ? <BurgerIngredients data={burgerData}/> : null }
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
                            <ModalPortal onClick={closeModal} isShowHeader={false}>
                                <OrderDetails/>
                            </ModalPortal>
                        )}
                    </div>
                </section>
        )
}

export default BurgerConstructor;