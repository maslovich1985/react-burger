import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader'
import {getIngredientsThunk} from "../../services/redux/actions/ingredientsListActions";
import {userProfileThunk} from "../../services/redux/actions/userActions";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import {MainPage} from "../../pages/MainPage/MainPage";
import {ProtectedRouteElement} from "../ProtectedRoute/ProtectedRoute"
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import {useAppDispatch} from "../../services/redux/hooks";
import {IngredientsListAction} from "../../services/redux/reducers/ingredientsListReducer";
import {UserAction} from "../../services/redux/reducers/userReducer";
import Feed from "../../pages/Feed/Feed";
import FeedIdPage from "../../pages/FeedIdPage/FeedIdPage";
import OrderIdPage from "../../pages/OrderIdPage/OrderIdPage";
import OrderNumberInfo from "../OrderNumberInfo/OrderNumberInfo";
import {Orders} from "../../pages/Orders/Orders";

function App() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const background = location.state && location.state.background;
    useEffect(() => {
        dispatch(getIngredientsThunk() as unknown as IngredientsListAction);
        dispatch(userProfileThunk() as unknown as UserAction);
    }, [])

    return (
        <>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/" element={<MainPage/>}/>
                <Route
                    path='/profile/orders'
                    element={
                        <ProtectedRouteElement>
                            <Orders/>
                        </ProtectedRouteElement>
                    }
                />
                <Route
                    path='/profile/orders/:id'
                    element={
                        <ProtectedRouteElement>
                            <OrderIdPage/>
                        </ProtectedRouteElement>
                    }
                />
                <Route path='/feed' element={<Feed/>}/>
                <Route path='/feed/:id' element={<FeedIdPage/>}/>
                <Route path="/ingredients/:id" element={<IngredientPage/>}/>
                <Route
                    path="/login"
                    element={
                        <ProtectedRouteElement onlyUnAuth={true}>
                            <Login/>
                        </ProtectedRouteElement>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRouteElement onlyUnAuth={true}>
                            <Register/>
                        </ProtectedRouteElement>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <ProtectedRouteElement onlyUnAuth={true}>
                            <ForgotPassword/>
                        </ProtectedRouteElement>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <ProtectedRouteElement onlyUnAuth={true}>
                            <ResetPassword/>
                        </ProtectedRouteElement>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRouteElement>
                            <Profile/>
                        </ProtectedRouteElement>
                    }
                />
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:id'
                        element={
                            <Modal isShowHeader={true}>
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                    <Route
                        path='/feed/:id'
                        element={
                            <Modal isShowHeader={false}>
                                <OrderNumberInfo/>
                            </Modal>
                        }
                    />
                    <Route
                        path='/profile/orders/:id'
                        element={
                            <Modal isShowHeader={false}>
                                <OrderNumberInfo/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
