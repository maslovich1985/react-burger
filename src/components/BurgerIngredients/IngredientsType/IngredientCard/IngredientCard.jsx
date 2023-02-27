import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientCard.module.css'
import PropTypes from "prop-types";
import DataPropTypes from '../../../../utils/prop-types';
import { useDrag } from "react-dnd";

function IngredientCard({ products, index, onClick }) {
    const [{isDrag}, dragRef] = useDrag({
        type: products.type,
        item: { id: products._id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    const digitsTextStyle = 'text text text_type_digits-default';
    const defaultTextStyle = 'text text_type_main-default';
    return (
        !isDrag && <div  ref={dragRef} onClick={() => onClick(products._id)} className={`${index % 2 === 0 ? 'ml-4' : 'ml-6'} ${index > 1 ? 'mt-8' : 'mt-6'} ${styles.wrapper}`}>
            { products.count > 0 && <div className={styles.counter}>
                <Counter count={products.count} size="default" />
            </div>}
            <div>
                    <img src={products.image} alt='ингридиент'/>
                    <div className={`${styles.price_container} mb-1 mt-1`}>
                       <div className={`${digitsTextStyle} mr-2`}>
                           {products.price}
                       </div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div className={`${defaultTextStyle} ${styles.ingredient_text}`}>
                    {products.name}
                </div>
        </div>
    );
}

IngredientCard.propTypes = {
    products: DataPropTypes.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default IngredientCard;