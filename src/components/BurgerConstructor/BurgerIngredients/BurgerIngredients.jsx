import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredients.module.css';
import DataPropTypes from '../../../utils/prop-types';
import PropTypes from "prop-types";
import ConstructorItem from "./ConstructorItem/ConstructorItem";

function BurgerIngredients({data}) {

    return (
        <div className='mt-4'>
            { data[0].type === 'bun' && <div className={styles.bun_product}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${data[0].name} (верх)`}
                    price={data[0].price}
                    thumbnail={data[0].image_mobile}
                />
            </div>}
            <div>
                {data.map((product, index) => {
                    return product.type !== 'bun' && (
                        <ConstructorItem
                            key={`${product.type}-${index}`}
                            name={product.name}
                            price={product.price}
                            itemId={product._id}
                            image={product.image}
                            index={index}
                        />
                    )}
                )}
            </div>
            { data[data.length-1].type === 'bun' && <div className={`${styles.bun_product} mt-4`}>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${data[data.length-1].name} (низ)`}
                    price={data[data.length-1].price}
                    thumbnail={data[data.length-1].image_mobile}
                />
            </div>}
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(DataPropTypes).isRequired
}

export default BurgerIngredients;