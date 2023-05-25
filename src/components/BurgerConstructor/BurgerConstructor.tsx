import React, {useState} from 'react';
import styles from './BurgerConstructor.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalPortal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {getOrderThunk} from "../../services/redux/actions/orderActions";
import {useDrop} from "react-dnd";
import {addIngredientInBurger} from "../../services/redux/actions/burgerIngredientsActions";
import {burgerIngredients} from "../../services/redux/selectors/burgerIngredientSelector";
import {increaseIngredientCounter} from "../../services/redux/actions/ingredientsListActions";
import {useAppDispatch, useAppSelector} from "../../services/redux/hooks";
import {IngredientWithCount} from "../BurgerIngredients/IngredientsType/IngredientCard/IngredientCard";
import {BurgerIngredientsAction} from "../../services/redux/reducers/burgerIngredientsReducer";
import {IngredientsListAction} from "../../services/redux/reducers/ingredientsListReducer";
import {OrderAction} from "../../services/redux/reducers/orderReducer";

function BurgerConstructor() {
    const dispatch = useAppDispatch();
    const burgerData = useAppSelector<IngredientWithCount[]>(burgerIngredients);

    const [, dropTarget] = useDrop({
        accept: ['bun', 'main', 'sauce'],
        drop(itemId) {
            const {id} = itemId as Record<'id', string>;
            dispatch(addIngredientInBurger(id) as unknown as BurgerIngredientsAction);
            dispatch(increaseIngredientCounter(id) as unknown as IngredientsListAction);
        },
    });
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const burgerCost = burgerData.map((ingredient) => ingredient?.price).reduce((acc, cur) => acc + cur, 0);
    const digitsTextStyle = 'text text_type_digits-medium';

    const openModal = () => {
        dispatch(getOrderThunk(burgerData) as unknown as OrderAction);
        setIsModalOpened(true);
    }
    const isDisable = burgerData.every(item => item.type !== 'bun');
    const closeModal = () => setIsModalOpened(false);
    return (<section ref={dropTarget} className={styles.wrapper}>
            <div className={`${styles.burger_constructor} mt-25 mr-4`}>
                {burgerData.length !== 0 ? <BurgerIngredients data={burgerData}/> : null}
            </div>
            <div className={`${styles.checkout} mt-10 mr-4`}>
                <div className={`${styles.price} mr-10`}>
                    <div className={`${digitsTextStyle} mr-2`}>
                        {burgerCost}
                    </div>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button disabled={isDisable} htmlType="button" type="primary" size="large" onClick={openModal}>
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