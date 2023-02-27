import React, {useMemo} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredients.module.css';
import DataPropTypes from '../../../utils/prop-types';
import PropTypes from "prop-types";
import ConstructorItem from "./ConstructorItem/ConstructorItem";

function BurgerIngredients({data}) {
    const { bun, ingredients } = useMemo(() => {
        return {
            bun: data.filter(item => item.type === 'bun'),
            ingredients: data.filter(item => item.type !== 'bun'),
        };
    }, [data]);
    return (
        <div className='mt-4'>
            { bun[0] && <div className={styles.bun_product}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun[0].name} (верх)`}
                    price={bun[0].price}
                    thumbnail={bun[0].image_mobile}
                />
            </div>}
            <div>
                {ingredients.map((product, index) => {
                    return (
                        <ConstructorItem
                            key={`${product.name}_${index}`}
                            name={product.name}
                            price={product.price}
                            itemId={product._id}
                            image={product.image}
                            index={index}
                        />
                    )}
                )}
            </div>
            { bun[1] && <div className={`${styles.bun_product} mt-4`}>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${bun[1].name} (низ)`}
                    price={bun[1].price}
                    thumbnail={bun[1].image_mobile}
                />
            </div>}
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(DataPropTypes).isRequired
}

export default BurgerIngredients;