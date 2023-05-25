import React, {FC} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    moveIngredientInBurger,
    removeIngredientFromBurger
} from "../../../../services/redux/actions/burgerIngredientsActions";
import {decreaseIngredientCounter} from "../../../../services/redux/actions/ingredientsListActions";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import styles from './ConstructorItem.module.css'

interface OwnProps {
    name: string;
    itemId: string;
    price: number;
    image: string;
    index: number;
}

const ConstructorItem: FC<OwnProps> = ({name, itemId, price, image, index}) => {
    const dispatch = useDispatch();
    const [, drag] = useDrag({
        type: "burgerConstructor",
        item: {itemId},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    });

    const [, dropRef] = useDrop({
        accept: "burgerConstructor",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            const {itemId} = item as Record<'itemId', string>;
            dispatch(moveIngredientInBurger(itemId, itemId));
        },
    });
    const removeFromConstructor = (id: string, index: number) => {
        dispatch(removeIngredientFromBurger(index));
        dispatch(decreaseIngredientCounter(id));
    }
    return (
        <div ref={dropRef}>
            <div ref={drag} className={`${styles.constructor_item} mt-4 mb-4`}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    isLocked={false}
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={() => removeFromConstructor(itemId, index)}
                />
            </div>
        </div>
    )
}

export default ConstructorItem;
