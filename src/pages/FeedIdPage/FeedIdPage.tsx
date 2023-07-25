import styles from './FeedIdPage.module.css';
import OrderNumberInfo from '../../components/OrderNumberInfo/OrderNumberInfo';
import {useEffect} from 'react';
import {wssBaseApiUrl} from '../../utils/burger-api';
import {useAppDispatch, useAppSelector} from "../../services/redux/hooks";
import {selectWsConnectionStatus} from "../../services/redux/selectors/wsSelectors";
import {wsConnectionStart} from "../../services/redux/actions/websocket";
import {WS_CONNECTION_CLOSED} from "../../services/redux/types/wsTypes";

const FeedIdPage = () => {
    const dispatch = useAppDispatch();
    const wsConnected = useAppSelector(selectWsConnectionStatus);

    useEffect(() => {
        wsConnected !== true && dispatch(wsConnectionStart(`${wssBaseApiUrl}/all`));

        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        };
    }, []);

    return <div className={styles.wrapper}>{<OrderNumberInfo/>}</div>;
};

export default FeedIdPage;