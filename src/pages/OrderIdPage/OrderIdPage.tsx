import styles from './OrderIdPage.module.css';
import OrderNumberInfo from '../../components/OrderNumberInfo/OrderNumberInfo';
import {useEffect} from 'react';
import {wssBaseApiUrl} from '../../utils/burger-api';
import {useAppDispatch, useAppSelector} from "../../services/redux/hooks";
import {selectWsConnectionStatus} from "../../services/redux/selectors/wsSelectors";
import {IWebsocketAction} from "../../services/redux/reducers/websocket";
import {wsConnectionStart} from "../../services/redux/actions/websocket";
import {WS_CONNECTION_CLOSED} from "../../services/redux/types/wsTypes";

const OrderIdPage = () => {
    const dispatch = useAppDispatch();
    const wsConnected = useAppSelector(selectWsConnectionStatus);

    useEffect(() => {
        wsConnected !== true && dispatch(wsConnectionStart(`${wssBaseApiUrl}/all`) as unknown as IWebsocketAction);

        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        };
    }, []);

    return <div className={styles.wrapper}>{<OrderNumberInfo/>}</div>;
};

export default OrderIdPage;