import moment from 'moment';

export const getOrderStatus = (status: string) => {
    switch (status) {
        case 'created':
            return 'Создан';
        case 'pending':
            return 'В процессе';
        case 'done':
            return 'Готов';
    }
};

export const formatOrderDate = (dateTimeString: string) => {
    moment.locale('ru');
    const orderTime = moment(dateTimeString);

    return `${orderTime.fromNow()}, ${orderTime.format('HH:mm')}`;
};