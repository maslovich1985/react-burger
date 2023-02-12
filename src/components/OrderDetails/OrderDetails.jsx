import React from 'react';
import styles from './OrderDetails.module.css'
import DoneIcon from "../../utils/doneIcon";

function OrderDetails() {
    const largeDigitStyle = "text text_type_digits-large";
    const mediumTextStyle ="text text_type_main-medium";
    const inactiveText = 'text text_type_main-default text_color_inactive';
    const defaultText = "text text_type_main-default";
    return (
        <div className={`${styles.wrapper} mt-4`}>
            <div className={`${styles.order_number} ${largeDigitStyle}`}>
                034536
            </div>
            <div className={`${styles.order_identifier} ${mediumTextStyle}`}>
                идентификатор заказа
            </div>
            <div className={styles.order_accepted_icon}>
                <DoneIcon/>
            </div>
            <div className={`${defaultText} ${styles.prepared_order_text} ml-25 mt-10`}>
                Ваш заказ начали готовить
            </div>
            <div className={`${inactiveText} ${styles.prepared_order_text} ml-25 mt-2 mb-30`}>
                Дождитесь готовности на орбитальной станции
            </div>
        </div>
    );
}

export default OrderDetails


