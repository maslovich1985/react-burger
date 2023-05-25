import {Navigate, useLocation} from 'react-router-dom';
import {isAuthorized} from '../../services/redux/selectors/userSelectors';
import {FC, ReactElement} from "react";
import {useAppSelector} from "../../services/redux/hooks";

interface OwnProps {
    onlyUnAuth?: boolean;
    children: ReactElement;
}

export const ProtectedRouteElement: FC<OwnProps> = ({children, onlyUnAuth = false}) => {
    const location = useLocation();
    const isAuth = useAppSelector(isAuthorized);
    if (!isAuth && !onlyUnAuth) {
        return <Navigate to="/login" state={{from: location.pathname}}/>;
    }
    if (onlyUnAuth && isAuth) {
        // const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to="/"/>;
    }

    return children
}