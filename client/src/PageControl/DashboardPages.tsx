import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "../components/Dashboard/Login";
import DashboardHome from "../components/Dashboard/DashboardHome";
import axios from "axios";
import {baseUrl} from "../Redux/variable";
import PageLoad from "../components/PageLoad";
import CategoryDashboard from "../components/Dashboard/CategoryDashboard";
import BannerDashboard from "../components/Dashboard/BannerDashboard";
import ServiceDashboard from "../components/Dashboard/ServiceDashboard";
import UsersDashboard from "../components/Dashboard/UsersDashboard";
import ProductsDashboard from "../components/Dashboard/ProductsDashboard";

const DashboardPages = () => {
    const adminToken=localStorage.getItem('admin')
    const [isShow,setIsShow]=useState(false)
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
       if (adminToken){
           axios.post(`${baseUrl}login/verify`,{
               token:`${adminToken}`
           })
               .then((res)=>{
                   if(res?.data?.verify?.user){
                       setIsShow(true)
                   }

               })
               .catch((err)=>{
                   setIsShow(false)
               })
               .finally(()=>{
                   setLoading(false)
               })
       }else {
           setLoading(false)
           setIsShow(false)
       }
    },[])
    return (
        <>
            {!loading?<>
                <Routes>
                    {!isShow && <Route path={"/dashboard/login"} element={<Login/>}/>}
                    {isShow &&
                        <Route path={"/dashboard/main"} element={<DashboardHome/>}>
                            <Route path="category" element={<CategoryDashboard />} />
                            <Route path="banner" element={<BannerDashboard />} />
                            <Route path="service" element={<ServiceDashboard />} />
                            <Route path="users" element={<UsersDashboard />} />
                            <Route path="products" element={<ProductsDashboard />} />
                        </Route>
                    }
                    <Route
                        path="/dashboard/main"
                        element={<Navigate to="/dashboard/login" replace/>}
                    />
                    <Route
                        path="/dashboard/login"
                        element={<Navigate to="/dashboard/main?category" replace/>}
                    />
                </Routes>
            </>
                :
                <>
                    <PageLoad/>
                </>}
        </>
    );
};

export default DashboardPages;
