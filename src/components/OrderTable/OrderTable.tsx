import {FC, useMemo} from 'react';
import styles from './OrderTable.module.css';
import {useSelector} from 'react-redux';
import {Ingredient} from '../../pages/IngredientPage/IngredientPage';
import {useAppSelector} from "../../services/redux/hooks";
import {selectOrders} from "../../services/redux/selectors/wsSelectors";
import {ingredients} from "../../services/redux/selectors/ingredientsListSelector";
import {Order} from "../Order";
import {IOrder} from "../Order/Order";

export interface IOrderExt {
    price: number;
    pictures: string[];
    isShowStatus?: boolean;
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}

interface IOrderTableProps {
    isShowStatus?: boolean;
}

const OrderTable: FC<IOrderTableProps> = ({isShowStatus}) => {
    const orders = useAppSelector(selectOrders) || [];
    const orderIngredients: Ingredient[] =
        useSelector(ingredients) || [];

    const ordersExt: IOrderExt[] = useMemo(() => {
        const result =
            orders.map((item: IOrder) => {
                return ({
                    ...item,
                    price: item.ingredients.reduce(
                        (acc: number, cur: string) =>
                            (orderIngredients.find((ingredient) => ingredient._id === cur)?.price ||
                                0) + acc,
                        0
                    ),
                    pictures: item.ingredients.map(
                        (i: string) => orderIngredients.find((j) => j._id === i)?.image_mobile || ''
                    ),
                })
            }) || [];

        return isShowStatus ? result.reverse() : result;
    }, [orders]);

    return (
        <div className={styles.cards_wrapper}>
            {ordersExt.map((order: IOrderExt) => (
                <Order
                    key={order._id}
                    status={order.status}
                    name={order.name}
                    createdAt={order.createdAt}
                    number={order.number}
                    price={order.price}
                    pictures={order.pictures}
                    isShowStatus={isShowStatus}
                />
            ))}
        </div>
    );
};

export default OrderTable;