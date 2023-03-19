import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { isAuthorized } from '../../services/redux/selectors/userSelectors';

export const ProtectedRouteElement = ({ children }) => {
    const isAuth = useSelector(isAuthorized);
    
    return isAuth ? children : <Navigate to="/login" replace/>;
}
