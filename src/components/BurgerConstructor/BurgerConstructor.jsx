import React from 'react';
import styles from './BurgerConstructor.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import data from '../../utils/data';

function BurgerConstructor() {
    const bunBottom = data[0];
    const ingredients = [...data, bunBottom];
    const burgerCost = ingredients.map((ingredient) => ingredient.price).reduce((acc, cur) => acc + cur, 0);
    const digitsTextStyle = 'text text_type_digits-medium';
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
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;