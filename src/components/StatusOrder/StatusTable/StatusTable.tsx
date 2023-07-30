import styles from './StatusTable.module.css';
import {FC, useMemo} from 'react';
import {IOrder} from '../../Order/Order';
import {useAppSelector} from "../../../services/redux/hooks";
import {selectOrders} from "../../../services/redux/selectors/wsSelectors";

interface IStatusTableProps {
    isReady: boolean;
}

const StatusTable: FC<IStatusTableProps> = ({isReady}) => {
    const orders: IOrder[] = useAppSelector(selectOrders) || [];
    const ordersReady = useMemo(() => {
        const result = [];
        const orderArray = orders
            .filter((order) =>
                isReady ? order.status === 'done' : order.status !== 'done'
            )
            .map((item) => item.number);

        for (let i = Math.ceil(orderArray.length / 10); i > 0; i--) {
            result.push(orderArray.splice(0, Math.ceil(orderArray.length / i)));
        }

        return result;
    }, [orders]);

    return (
        <div className={styles.columns_wrapper}>
            {ordersReady.map((order, index) => (
                <div key={index} className={styles.column_container}>
                    {order.map((item) => (
                        <span
                            key={item}
                            className='text text_type_digits-default'
                            style={{color: isReady ? '#00cccc' : '#f2f2f3'}}
                        >
              {item}
            </span>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default StatusTable;