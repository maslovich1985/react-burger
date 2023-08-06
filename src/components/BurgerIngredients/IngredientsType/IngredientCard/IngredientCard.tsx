import React, {FC} from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientCard.module.css'
import {useDrag} from "react-dnd";
import {Ingredient} from "../../../../pages/IngredientPage/IngredientPage";

export interface IngredientWithCount extends Ingredient {
    count: number;
}

interface OwnProps {
    products: IngredientWithCount;
    index: number;
    onClick: (id: string) => void;
}

const IngredientCard: FC<OwnProps> = ({products, index, onClick}) => {
    const [, dragRef] = useDrag({
        type: products.type,
        item: {id: products._id},
        // collect: monitor => ({
        //     isDrag: monitor.isDragging()
        // })
    });
    const digitsTextStyle = 'text text text_type_digits-default';
    const defaultTextStyle = 'text text_type_main-default';
    return (
        // !isDrag ?
        (<div ref={dragRef} onClick={() => onClick(products._id)}
              className={`${index % 2 === 0 ? 'ml-4' : 'ml-6'} ${index > 1 ? 'mt-8' : 'mt-6'} ${styles.wrapper}`}
              data-cy={`ingredientItem-${products._id}`}>
            {products.count > 0 && (
                <div className={styles.counter}>
                    <Counter count={products.count} size="default"/>
                </div>
            )}
            <div>
                <img src={products.image} alt='ингридиент'/>
                <div className={`${styles.price_container} mb-1 mt-1`}>
                    <div className={`${digitsTextStyle} mr-2`}>
                        {products.price}
                    </div>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
            <div className={`${defaultTextStyle} ${styles.ingredient_text}`}>
                {products.name}
            </div>
        </div>)
        // : null
    );
}

export default IngredientCard;