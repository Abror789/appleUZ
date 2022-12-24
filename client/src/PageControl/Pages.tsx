import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import HeaderMargin from "../components/HeaderMargin";
import Search from "../components/Search";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductView from "../pages/ProductView";
import BroService from "../pages/BroService";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import CartPage from "../pages/CartPage";
import LikePage from "../pages/LikePage";
import ProfilePage from "../pages/ProfilePage";
import PaymentPage from "../pages/PaymentPage";
import Button from "../components/Button";
import SearchList from "../components/SearchList";
import Add from "../components/Add";
import Footer from "../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux/store";
import {getUser} from "../Redux/features/user/userSlice";
import {TOKEN} from "../Redux/variable";
import PageLoad from "../components/PageLoad";
import {HelmetProvider} from "react-helmet-async";
import Orders from "../components/Orders";
import OneOrder from "../components/OneOrder";

const Pages = () => {
    const dispatch=useDispatch<any>()
    const [isShow,setIsShow]=useState(false)

    const location=useLocation()
    useEffect(()=>{
        dispatch(getUser(TOKEN))
        setIsShow(location.pathname.includes('dashboard'))
    },[location.pathname])
    const defaultList = useSelector((state: RootState) => state.user)
    const {status}=defaultList
    const {list}=defaultList
    return (
        <HelmetProvider>
            {
                status !== 'loading'
                    ?
                    <>
                        <Navbar/>
                        <HeaderMargin/>
                        <Search/>
                        <Routes>
                            <Route path={"/"} element={<Home/>}/>
                            <Route path={"/products/:product"} element={<Products/>}/>
                            <Route path={"/product/:product"} element={<ProductView/>}/>
                            <Route path={"/bro-service"} element={<BroService/>}/>
                            {!list.user && <Route path={"/signin"} element={<SignInPage/>}/>}
                            {!list.user && <Route path={"/signup"} element={<SignUpPage/>}/>}
                            <Route path={"/cart"} element={<CartPage/>}/>
                            <Route path={"/favorites"} element={<LikePage/>}/>
                            {list.user && <Route path={"/profile"} element={<ProfilePage/>}/>}
                            <Route
                                path="/signup"
                                element={<Navigate to="/profile" replace/>}
                            />
                            <Route
                                path="/signin"
                                element={<Navigate to="/profile" replace/>}
                            />
                            <Route
                                path="/profile"
                                element={<Navigate to="/signin" replace/>}
                            />
                            {list.user && <Route path={"/checkout"} element={<PaymentPage/>}/>}
                            {list.user && <Route path={"/orders"} element={<Orders/>}/>}
                            {list.user && <Route path={"/orders/:id"} element={<OneOrder/>}/>}
                            <Route
                                path="/checkout"
                                element={<Navigate to="/signin" replace/>}
                            />
                            <Route
                                path="/orders"
                                element={<Navigate to="/signin" replace/>}
                            />
                            <Route
                                path="/orders/:id"
                                element={<Navigate to="/signin" replace/>}
                            />
                            <Route path={"/item"} element={<Button/>}/>


                            <Route path={"/search"} element={<SearchList/>}/>
                            <Route path={"/add"} element={<Add/>}/>
                        </Routes>
                        <Footer/>
                    </>
                    :
                    <>
                        <PageLoad/>
                    </>
            }
        </HelmetProvider>

    );
};

export default Pages;
