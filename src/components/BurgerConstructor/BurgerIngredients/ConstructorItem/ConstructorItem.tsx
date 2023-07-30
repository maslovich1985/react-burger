import React, {FC} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    moveIngredientInBurger,
    removeIngredientFromBurger
} from "../../../../services/redux/actions/burgerIngredientsActions";
import {decreaseIngredientCounter} from "../../../../services/redux/actions/ingredientsListActions";
import {useDrag, useDrop} from "react-dnd";
import styles from './ConstructorItem.module.css'
import {useAppDispatch} from "../../../../services/redux/hooks";

interface OwnProps {
    name: string;
    itemId: string;
    price: number;
    image: string;
    ingridientId: string;
}

const ConstructorItem: FC<OwnProps> = ({name, itemId, price, image, ingridientId}) => {
    const dispatch = useAppDispatch();
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
            const {itemId: id} = item as Record<'itemId', string>;
            dispatch(moveIngredientInBurger(id, itemId));
        },
    });
    const removeFromConstructor = (id: string, ingridientId: string) => {
        dispatch(removeIngredientFromBurger(id));
        dispatch(decreaseIngredientCounter(ingridientId));
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
                    handleClose={() => removeFromConstructor(itemId, ingridientId)}
                />
            </div>
        </div>
    )
}

export default ConstructorItem;
