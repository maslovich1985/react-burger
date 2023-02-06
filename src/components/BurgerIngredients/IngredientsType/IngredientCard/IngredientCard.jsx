import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngredientCard.module.css'
import PropTypes from "prop-types";

function IngredientCard(props) {
    const mockOrder = {
        'bun': 0,
        'sauce': 1,
        'main': [2, 3, 4, 5, 7],
    };

    const getOrder = (type, index) => {
        if (Array.isArray(mockOrder[type])) {
            return mockOrder[type].includes(index);
        }
        return mockOrder[type] === index;
    }
    console.log(props);
    const { products, index } = props;
    const digitsTextStyle = 'text text text_type_digits-default';
    const defaultTextStyle = 'text text_type_main-default';
    return (
        <div className={`${index % 2 === 0 ? 'ml-4' : 'ml-6'} ${index > 1 ? 'mt-8' : 'mt-6'} ${styles.wrapper}`}>
            { getOrder(products.type, index) && <div className={styles.counter}>
                <Counter count={1} size="default" />
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

const DataPropTypes = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['main', 'bun', 'sauce']),
    __v: 0,
    _id: PropTypes.string.isRequired,
});

IngredientCard.propTypes ={
    data: DataPropTypes.isRequired,
    index: PropTypes.number.isRequired,
}

export default IngredientCard;