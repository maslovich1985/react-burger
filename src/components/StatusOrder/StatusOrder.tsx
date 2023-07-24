import styles from './StatusOrder.module.css';
import StatusTable from './StatusTable/StatusTable';
import {useAppSelector} from "../../services/redux/hooks";
import {selectOrdersTotal, selectOrdersTotalToday} from "../../services/redux/selectors/wsSelectors";

const StatusOrder = () => {
    const total: number = useAppSelector(selectOrdersTotal);
    const totalToday: number = useAppSelector(selectOrdersTotalToday);

    return (
        <div className={styles.wrapper}>
            <div className={styles.status_wrapper}>
                <div className={styles.status_item_container}>
                    <p className='text text_type_main-medium pb-4'>Готовы:</p>
                    <StatusTable isReady/>
                </div>
                <div className={styles.status_item_container}>
                    <p className='text text_type_main-medium pb-4'>В работе:</p>
                    <StatusTable isReady={false}/>
                </div>
            </div>
            <p className='text text_type_main-medium mt-20'>
                Выполнено за всё время:
            </p>
            <p className='text text_type_digits-large'>{total}</p>
            <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
            <p className='text text_type_digits-large'>{totalToday}</p>
        </div>
    );
};

export default StatusOrder;