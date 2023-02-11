import React, {useEffect, useRef} from 'react';
import styles from './IngredientsType.module.css'
import IngredientCard from "./IngredientCard/IngredientCard";
import PropTypes from "prop-types";
import DataPropTypes from '../../../utils/prop-types';

function IngredientsType({data, type, onClick}) {
    const typeRef = useRef(null);

    useEffect(() => {
        typeRef.current.scrollIntoView({ behavior: "smooth" });
    }, [type]);

    const dataObj = {
        main: 'Начинки',
        bun: 'Булки',
        sauce: 'Соусы',
    };

    const ingredientsTypes = ['bun', 'sauce', 'main'];
    const mediumTextStyle = 'text text_type_main-medium';
    return (
        <>
            {ingredientsTypes.map((products, i) => {
                const productsKind = data.filter((type) => type.type === products);
                    if (type === dataObj[products]) {
                       return (
                           <div ref={typeRef} key={`${products.type}-${i}`} className={`${styles.wrapper} pt-10`}>
                               <div className={mediumTextStyle}>
                                    {dataObj[products]}
                                </div>
                                <div className={styles.ingredients_cards_wrapper}>
                                    {productsKind.map((products, i) => <IngredientCard onClick={onClick} products={products} key={`${products.type}-${i}`} index={i}/>)}
                                </div>
                           </div>
                       )}
                return (
                    <div key={`${products.type}-${i}`} className={`${styles.wrapper} mt-10`}>
                        <div className={mediumTextStyle}>
                            {dataObj[products]}
                        </div>
                        <div className={styles.ingredients_cards_wrapper}>
                            {productsKind.map((products, i) => <IngredientCard onClick={onClick} products={products} key={`${products.type}-${i}`} index={i}/>)}
                        </div>
                    </div>
                )}
            )}
        </>
    );
}

IngredientsType.propTypes = {
    data: PropTypes.arrayOf(DataPropTypes).isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default IngredientsType;