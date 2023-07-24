import {FC} from 'react';
import styles from './Order.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import 'moment/locale/ru';
import {useLocation, useNavigate} from 'react-router-dom';
import {formatOrderDate, getOrderStatus} from '../../utils/common';

export interface IOrder {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}

interface OwnProps {
    status: string;
    name: string;
    createdAt: string;
    number: number;
    price: number;
    pictures: string[];
    isShowStatus?: boolean;
}

export const Order: FC<OwnProps> = ({name, createdAt, number, price, pictures, isShowStatus, status}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const orderTimeString = formatOrderDate(createdAt);
    const remainIngredientsCount = pictures.length - 6;

    const handleClickOrderContainer = () => {
        if (isShowStatus) {
            navigate(`/profile/orders/${number}`, {
                state: {background: location},
            });
        } else {
            navigate(`/feed/${number}`, {state: {background: location}});
        }
    };

    return (
        <div className={styles.order_container} onClick={handleClickOrderContainer}>
            <div className={styles.order_number_container}>
                <span className='text text_type_digits-default'>#{`${number}`}</span>
                <span className='text text_type_main-default text_color_inactive'>
          {orderTimeString}
        </span>
            </div>
            <div>
                <p
                    className={`${styles.order_name} text text_type_main-medium`}
                    title={name}
                >
                    {name}
                </p>
                {isShowStatus && (
                    <p className='text text_type_main-default pt-1'>
                        {getOrderStatus(status)}
                    </p>
                )}
            </div>
            <div className={styles.ingredients_price_container}>
                <div className={styles.ingredients_container}>
                    {pictures.map((item, index) => {
                        return index <= 5 ? (
                            <div
                                className={styles.ingredient_image_box}
                                key={item + index}
                                style={{left: index * 48}}
                            >
                                <img
                                    className={styles.ingredient_image}
                                    src={item}
                                    alt={item}
                                    style={{zIndex: 1000 - index}}
                                />
                                {index === 5 && remainIngredientsCount > 0 && (
                                    <p
                                        className='text text_type_main-default'
                                        style={{zIndex: 1001}}
                                    >
                                        +{remainIngredientsCount}
                                    </p>
                                )}
                            </div>
                        ) : null;
                    })}
                </div>
                <div className={styles.price_container}>
          <span
              className={`text ${
                  isShowStatus
                      ? 'text_type_digits-default'
                      : 'text_type_digits-medium'
              } mr-2`}
          >
            {price}
          </span>
                    <div className={styles.icon_wrapper}>
                        <CurrencyIcon type='primary'/>
                    </div>
                </div>
            </div>
        </div>
    );
};