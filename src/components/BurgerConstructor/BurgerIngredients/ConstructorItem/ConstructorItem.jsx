import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    moveIngredientInBurger,
    removeIngredientFromBurger
} from "../../../../utils/services/redux/actions/burgerIngredientsActions";
import {decreaseIngredientCounter} from "../../../../utils/services/redux/actions/ingredientsListActions";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";

export default function ConstructorItem({key, name, itemId, price, image, index}) {
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
        <div key={key} ref={dropRef}>
            <div ref={drag} className='mt-4 mb-4' >
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
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
}