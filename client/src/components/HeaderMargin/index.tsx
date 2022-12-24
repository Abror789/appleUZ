import React, {useEffect, useState} from 'react';
import {routesControl} from "../../utils/routes";
import {useLocation} from "react-router-dom";

const HeaderMargin = () => {
    const location=useLocation()
    const [isActive,setIsActive]=useState(true)
     useEffect(()=>{
        setIsActive( routesControl.some((x)=>location.pathname.includes(x)))
   },[location])
    return (
       <div className={isActive?'short':'long'}/>
    );
};

export default HeaderMargin;
