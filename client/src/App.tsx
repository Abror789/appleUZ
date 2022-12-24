import React, {useEffect, useState} from 'react';
import './styles/global.scss'
import {HelmetProvider} from 'react-helmet-async'
import {Routes, Route, Navigate, useLocation} from "react-router-dom";

import Pages from "./PageControl/Pages";
import DashboardPages from "./PageControl/DashboardPages";
import Login from "./components/Dashboard/Login";


const App = () => {
    const [isShow,setIsShow]=useState(false)

    const location=useLocation()

    useEffect(()=>{
        setIsShow(location.pathname.includes('dashboard'))
    },[location.pathname])


    return (
       <>
           {
               !isShow
                   ?
                   <Pages/>
                   :
                  <DashboardPages/>

           }
       </>
    );
};

export default App;
