import {Navigate, useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import { isAuthorized } from '../../services/redux/selectors/userSelectors';
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ children,  onlyUnAuth = false}) => {
    const location = useLocation();
    const isAuth = useSelector(isAuthorized);
    if (!isAuth && !onlyUnAuth) {
       return <Navigate to="/login" state={{ from: location.pathname }}/>;
    }
    if (onlyUnAuth && isAuth) {
        // const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to="/" />;
    }

    return children
}

ProtectedRouteElement.propTypes = {
    children: PropTypes.element.isRequired,
    onlyUnAuth: PropTypes.bool
}