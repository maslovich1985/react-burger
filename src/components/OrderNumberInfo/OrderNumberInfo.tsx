import styles from './OrderNumberInfo.module.css';
import {useParams} from 'react-router-dom';
import {Ingredient} from '../../pages/IngredientPage/IngredientPage';
import {formatOrderDate, getOrderStatus} from '../../utils/common';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useEffect} from 'react';
import {selectOrders, selectWsConnectionStatus} from "../../services/redux/selectors/wsSelectors";
import {IOrder} from "../Order/Order";
import {useAppSelector} from "../../services/redux/hooks";
import {ingredients} from "../../services/redux/selectors/ingredientsListSelector";

const OrderNumberInfo = () => {
    const orders: IOrder[] = useAppSelector(selectOrders) || [];
    const wsConnected = useAppSelector(selectWsConnectionStatus);
    const orderIngredients: Ingredient[] =
        useAppSelector(ingredients) || [];
    const {id} = useParams();
    const order = orders.find((item) => item.number === +(id || 0));

    useEffect(() => {
        window.history.replaceState({}, "");
    }, []);

    const countInfo: Record<string, number> = {};
    order?.ingredients.forEach((i) =>
        countInfo[i] ? (countInfo[i] += 1) : (countInfo[i] = 1)
    );
    const orderList = Object.keys(countInfo).map((item) => {
        const ingredient = orderIngredients.find((i) => i._id === item);

        return {
            image: ingredient?.image_mobile || '',
            name: ingredient?.name,
            price: ingredient?.price,
            count: countInfo[item],
        };
    });

    const totalPrice = orderList.reduce(
        (acc, cur) => acc + (cur.price || 0) * cur.count,
        0
    );

    if (!wsConnected) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            {order ? (
                <>
                    <p className='text text_type_main-default pb-6'>#{order.number}</p>
                    <p
                        className='text text_type_main-medium pb-3'
                        style={{alignSelf: 'start'}}
                    >
                        {order.name}
                    </p>
                    <p
                        className='text text_type_main-default pb-10'
                        style={{color: '#00cccc', alignSelf: 'start'}}
                    >
                        {getOrderStatus(order.status)}
                    </p>
                    <p
                        className='text text_type_main-medium pb-4'
                        style={{alignSelf: 'start'}}
                    >
                        Состав:
                    </p>
                    <div className={styles.ingredients_table_box}>
                        {orderList.map((item, index) => (
                            <div
                                key={index + (item?.name || '')}
                                className={styles.ingredient_container}
                            >
                                <div className={styles.ingredient_image_name_wrapper}>
                                    <div className={styles.ingredient_image_box}>
                                        <img
                                            className={styles.ingredient_image}
                                            src={item.image}
                                            alt={item.image}
                                        />
                                    </div>
                                    <p className='text text_type_main-default pl-4'>
                                        {item.name}
                                    </p>
                                </div>
                                <div className={styles.price_container}>
                  <span className={'text text_type_digits-default mr-2'}>
                    {item.count} x {item.price}
                  </span>
                                    <div className={styles.icon_wrapper}>
                                        <CurrencyIcon type='primary'/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.footer_container}>
                        <p className='text text_type_main-default text_color_inactive'>
                            {formatOrderDate(order.createdAt)}
                        </p>
                        <div className={styles.price_container}>
              <span className={'text text_type_digits-default mr-2'}>
                {totalPrice}
              </span>
                            <div className={styles.icon_wrapper}>
                                <CurrencyIcon type='primary'/>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p className='text text_type_main-default pb-15'>
                    Заказа с номером {id} не найдено!
                </p>
            )}
        </div>
    );
};

export default OrderNumberInfo;