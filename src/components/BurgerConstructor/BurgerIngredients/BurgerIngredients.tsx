import React, {FC, useMemo} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredients.module.css';
import ConstructorItem from "./ConstructorItem/ConstructorItem";

interface Product {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: 'main' | 'bun' | 'sauce';
    __v: number;
    _id: string;
    id: string;
}

interface OwnProps {
    data: Product[]
}

const BurgerIngredients: FC<OwnProps> = ({data}) => {
    const {bun, ingredients} = useMemo(() => {
        return {
            bun: data.filter((item: Product) => item.type === 'bun'),
            ingredients: data.filter((item: Product) => item.type !== 'bun'),
        };
    }, [data]);
    return (
        <div className='mt-4'>
            {bun[0] && <div className={styles.bun_product}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun[0].name} (верх)`}
                    price={bun[0].price}
                    thumbnail={bun[0].image_mobile}
                />
            </div>}
            <div>
                {ingredients.map((product: Product, index: number) => {
                        return (
                            <ConstructorItem
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                itemId={product.id}
                                image={product.image}
                                ingridientId={product._id}
                            />
                        )
                    }
                )}
            </div>
            {bun[1] && <div className={`${styles.bun_product} mt-4`}>
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

export default BurgerIngredients;