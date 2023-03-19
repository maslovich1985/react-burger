import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader'
import {getIngredientsThunk} from "../../services/redux/actions/ingredientsListActions";
import {userProfileThunk} from "../../services/redux/actions/userActions";
import { useDispatch } from "react-redux";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import {MainPage} from "../../pages/MainPage/MainPage";
import {ProtectedRouteElement} from "../ProtectedRoute/ProtectedRoute"
import Orders from "../../pages/Orders/Orders";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredientsThunk());
        dispatch(userProfileThunk());
    }, [dispatch])

    return (
        <Router>
            <AppHeader/>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <ProtectedRouteElement>
                            <MainPage />
                        </ProtectedRouteElement>
                    }
                />
                <Route
                    path='/profile/orders'
                    element={
                        <ProtectedRouteElement>
                            <Orders />
                        </ProtectedRouteElement>
                    }
                />
                <Route path="/ingredients/:id" element={<IngredientPage />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/forgot-password" element={<ForgotPassword />}/>
                <Route path="/reset-password" element={<ResetPassword />}/>
                <Route
                    path="/profile"
                    element={
                        <ProtectedRouteElement>
                            <Profile />
                        </ProtectedRouteElement>
                    }
                />
            </Routes>
        </Router>
  );
}

export default App;
