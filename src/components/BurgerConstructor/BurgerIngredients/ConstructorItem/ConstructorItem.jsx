import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    moveIngredientInBurger,
    removeIngredientFromBurger
} from "../../../../services/redux/actions/burgerIngredientsActions";
import {decreaseIngredientCounter} from "../../../../services/redux/actions/ingredientsListActions";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";
import styles from './ConstructorItem.module.css'

export default function ConstructorItem({name, itemId, price, image, index}) {
    const dispatch = useDispatch();
    const [, drag] = useDrag({
        type: "burgerConstructor",
        item: { id: itemId },
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
            dispatch(moveIngredientInBurger(item.id, itemId));
        },
    });
    const removeFromConstructor = (id, index) => {
        dispatch(removeIngredientFromBurger(index));
        dispatch(decreaseIngredientCounter(id));
    }
    return (
        <div ref={dropRef}>
            <div ref={drag} className={`${styles.constructor_item} mt-4 mb-4`} >
                <DragIcon type="primary" />
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

ConstructorItem.propTypes = {
    name: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
}