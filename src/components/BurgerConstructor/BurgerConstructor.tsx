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
import {isAuthorized} from "../../services/redux/selectors/userSelectors";
import {useNavigate} from "react-router-dom";

function BurgerConstructor() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const burgerData = useAppSelector<IngredientWithCount[]>(burgerIngredients);
    const isAuth = useAppSelector<boolean>(isAuthorized);

    const [, dropTarget] = useDrop({
        accept: ['bun', 'main', 'sauce'],
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
        drop(itemId) {
            const {id} = itemId as Record<'id', string>;
            dispatch(addIngredientInBurger(id));
            dispatch(increaseIngredientCounter(id));
        },
    });
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const burgerCost = burgerData.map((ingredient) => ingredient?.price).reduce((acc, cur) => acc + cur, 0);
    const digitsTextStyle = 'text text_type_digits-medium';

    const openModal = () => {
        if (!isAuth) {
            navigate('/login');
        } else {
            dispatch(getOrderThunk(burgerData));
            setIsModalOpened(true);
        }
    }
    const isDisable = burgerData.every(item => item.type !== 'bun');
    const closeModal = () => setIsModalOpened(false);
    return (<section ref={dropTarget} className={styles.wrapper} data-cy='constructor-container'>
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