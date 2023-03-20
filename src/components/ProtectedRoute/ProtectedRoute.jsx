import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { isAuthorized } from '../../services/redux/selectors/userSelectors';
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ children }) => {
    const isAuth = useSelector(isAuthorized);
    if (!isAuth) {
        <Navigate to="/login"/>;
    }
    return children
}

ProtectedRouteElement.propTypes = {
    children: PropTypes.element.isRequired,
}