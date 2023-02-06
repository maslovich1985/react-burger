import React from 'react';
import styles from './IngredientsType.module.css'
import IngredientCard from "./IngredientCard/IngredientCard";
import PropTypes from "prop-types";

function IngredientsType(props) {
    const dataObj = {
        main: 'Начинки',
        bun: 'Булки',
        sauce: 'Соусы',
    };
    const ingredientsTypes = ['bun', 'sauce', 'main'];
    const mediumTextStyle = 'text text_type_main-medium';
    const data = props.data;
    return (
        <>
            {ingredientsTypes.map((products, i) => {
                const productsKind = data.filter((type) => type.type === products);
                return (
                    <div key={`${products.type}-${i}`} className={`${styles.wrapper} mt-10`}>
                        <div className={mediumTextStyle}>
                            {dataObj[products]}
                        </div>
                        <div className={styles.ingredients_cards_wrapper}>
                            {productsKind.map((products, i) => <IngredientCard products={products} key={`${products.type}-${i}`} index={i}/>)}
                        </div>
                    </div>
                )}
            )}
        </>
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

IngredientsType.propTypes = {
    data: PropTypes.arrayOf(DataPropTypes).isRequired
}

export default IngredientsType;