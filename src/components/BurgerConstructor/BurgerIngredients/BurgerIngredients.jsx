import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredients.module.css';
import DataPropTypes from '../../../utils/prop-types';
import PropTypes from "prop-types";

function BurgerIngredients({data}) {
    return (
        <div>
            {data.map((product, index) => {
                return (
                    <div key={`${product.type}-${index}`} className='mt-4'>
                        {(index === 0 || index === data.length - 1) ?
                            <div className={styles.bun_product}>
                                <ConstructorElement
                                    type={index === 0 ? "top" : 'bottom'}
                                    isLocked={true}
                                    text={index === 0 ? `${product.name} (верх)` : `${product.name} (низ)`}
                                    price={product.price}
                                    thumbnail={product.image_mobile}
                                />
                            </div> :
                            <div>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    isLocked={false}
                                    text={product.name}
                                    price={product.price}
                                    thumbnail={product.image_mobile}
                                />
                            </div>
                        }
                    </div>
                )}
            )}
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(DataPropTypes).isRequired
}

export default BurgerIngredients;