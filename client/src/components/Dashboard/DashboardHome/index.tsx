import React, {useEffect} from "react";
import axios from "axios";
import {baseUrl} from "../../../Redux/variable";
import {Link, NavLink, Route, Routes, useLocation, useNavigate,redirect} from "react-router-dom";
import CategoryDashboard from "../CategoryDashboard";
import BannerDashboard from "../BannerDashboard";
import ServiceDashboard from "../ServiceDashboard";
import UsersDashboard from "../UsersDashboard";
import ProductsDashboard from "../ProductsDashboard";

const DashboardHome = () => {
    const adminToken=localStorage.getItem('admin')
    const navigate=useNavigate()
    const {search}=useLocation()
    const links=[
        {
            _id:1,
            link:'',
            title:"Category",
            active:'?category'
        },
        {
            _id:2,
            link:'/banner',
            title:"Banner",
            active: '?banner'
        },
        {
            _id:3,
            link:'/service',
            title:"Service",
            active: '?service'
        },
        {
            _id:4,
            link:'/users',
            title:"Users",
            active: '?users'
        },
        {
            _id:5,
            link:'/products',
            title:"Products",
            active: '?products'
        }
    ]

    useEffect(()=>{
       if (adminToken){
           axios.post(`${baseUrl}login/verify`,{
               token:`${adminToken}`
           })
               .then((res)=>{
                   if(res?.data?.verify?.user){
                       if (search.length===0){
                           navigate('/dashboard/login?category')
                       }
                   }
               })
               .catch((err)=>{
                   console.log(err)
                   navigate('/dashboard/login')
                   window.location.reload();
               })
       }else {
           navigate('/dashboard/login')
           window.location.reload();
       }
    },[])
    return (
        <section className={"dashboard_main"}>
            <div className="left">
                <div className="logo">
                    <Link to={"/"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                             className="bi bi-apple" viewBox="0 0 16 16">
                            <path
                                d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                            <path
                                d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"/>
                        </svg>
                        <span>AppleUz</span>
                    </Link>
                </div>
                <div className="links">
                    {links.map((item,i)=>{
                        return(
                            <NavLink key={i} className={search===item.active?'activeClassName':''}  to={`/dashboard/main${item.link}${item.active}`}>{item.title}</NavLink>
                        )
                    })}
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <button>
                        Log Out
                    </button>
                </div>
                <div className="content">
                    <Routes>
                        <Route path={"/banner"} index element={<BannerDashboard/>}/>
                        <Route path={"/service"} index element={<ServiceDashboard/>}/>
                        <Route path={"/users"} index element={<UsersDashboard/>}/>
                        <Route path={"/products"} index element={<ProductsDashboard/>}/>
                        <Route path={"/"} element={<CategoryDashboard/>}/>
                    </Routes>
                </div>
            </div>
        </section>
    );
};

export default DashboardHome;
