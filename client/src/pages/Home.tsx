import React, {useEffect} from 'react';
import Banner from "../components/Banner";
import NewProduct from "../components/NewProduct";
import {useDispatch, useSelector} from "react-redux";
import {getBanner} from "../Redux/features/banner/bannerSlice";
import {RootState} from "../Redux/store";
import PageLoad from "../components/PageLoad";


const Home = () => {

    const dispatch=useDispatch<any>()
    useEffect(()=>{
        dispatch(getBanner())
    },[])
    const defaultList = useSelector((state: RootState) => state.banner)

    const {status}=defaultList
    const {list}=defaultList

    return (
        <>
            {
                status!='loading'?
                <>
                    <Banner status={status} list={list}/>
                    <NewProduct title={"Yangi mahsulotlar"}/>
                    <NewProduct title={"Mac"}/>
                    <NewProduct title={"iPhone"}/>
                    <NewProduct title={"iPad"}/>
                    <NewProduct title={"Watch"}/>
                </>
                    :
                <>
                    <PageLoad/>
                </>
            }
        </>
    );
};

export default Home;
