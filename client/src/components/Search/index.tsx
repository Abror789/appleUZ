import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl, fileUrl} from "../../Redux/variable";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {priceToString} from "../../utils/price";
import {routesControl} from "../../utils/routes";
import ClockLoader from "react-spinners/ClockLoader";

type Products={
    _id:string,
    title:string,
    category:string,
    images:string[],
    price:number,
    characters:{
        name:string,
        char:string,
        _id:string
    }[],
    createdAt:string,
    updatedAt:string,
    isLike:boolean,
    __v:number
}[]


const Index = () => {
    const [search,setSearch]=useState<any>('')
    const [data,setData]=useState<Products>([])
    const [isActive,setIsActive]=useState(true)
    const navigate=useNavigate()
    const location=useLocation()
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        setSearch('')
        setIsActive(routesControl.some((x)=>location.pathname.includes(x)))
    },[location.pathname])

    const input=document.getElementById('myInput')
    const btn=document.getElementById("myBtn")
    if (input !==null){
        input.addEventListener('keypress',(e)=>{
            if (e.key==="Enter"){
                e.preventDefault();
                if (btn !==null){
                    btn.click();
                }
            }
        })
    }

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setLoading(true)
        if (e.target.value.length>=1){
            axios.get(`${baseUrl}products/filter/items?text=${e.target.value}`)
                .then((res)=>{
                    setData([])
                    setData(res?.data?.product)
                    console.log(res?.data?.product)
                })
                .catch((err)=>{
                    console.log(err)
                })
                .finally(()=>{
                    setLoading(false)
                })
        }
    }




    if (isActive){
        return null
    }else {
        return (
            <section className={'search'}>
                <div className="container">
                    <div className="input_group">
                        <input id={'myInput'} value={search} onChange={handleSearch} placeholder={"Mahsulot qidirng"} type="text"/>
                        <button id="myBtn" onClick={()=>{
                            if (search.length>=1){
                                navigate(`/search?term=${search}`)
                                setSearch('')
                            }
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </div>
                    {search.length>=1&&<div className="products">
                        {!loading &&
                            <>
                                {data.length>=1 ?
                                    <div className="container">
                                        <div className="row">
                                            {
                                                data?.map((item)=>{
                                                    const linkName=item.title.split(' ').join('-').replace("/","-")
                                                    return(
                                                        <div key={item?._id} className="col_4">
                                                            <Link onClick={()=>{
                                                                setSearch('')
                                                            }} to={`/product/${linkName}?${item._id}`}>
                                                                <div className={"img_div"}>
                                                                    <img src={`${fileUrl}${item.images[0]}`} alt={item.title}/>
                                                                </div>
                                                                <div className="info_div">
                                                                    <p>{item.title}</p>
                                                                    <p>{priceToString(item.price)} so'm dan</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </div>
                                    </div>
                                    :
                                    <div className={"no_data"}>So'rov bo'yicha hech nima topilmadi😕</div>
                                }
                            </>
                        }
                        {loading && <div className="loader">
                            <ClockLoader color="#06c" />
                        </div>}
                    </div>}
                </div>
            </section>
        );
    }

};

export default Index;
