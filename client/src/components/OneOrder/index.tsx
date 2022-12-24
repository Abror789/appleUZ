import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {baseUrl, TOKEN} from "../../Redux/variable";
import apelsin from '../../assets/apelsin.png'
import {priceToString} from "../../utils/price";
import PageLoad from "../PageLoad";

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
type Order={
    allSum:number,
    comment?:string,
    createdAt:string,
    fullName:string,
    paymentType:number,
    phone:number,
    products:{
        productId:string,
        quantity:number,
        _id:string
    }[],
    receptionType:number,
    status:number,
    updatedAt:string,
    userId:string,
    __v:number,
    _id:number

}


const OneOrder = () => {
    const {id}=useParams()
    const [data,setData]=useState<Order>()
    const [products,setProducts]=useState<Products>([])
    const [loading,setLoading]=useState<boolean>(true)
    const getOneOrder=()=>{
        axios.get(`${baseUrl}orders/mine/${id}`,
            {
                headers:{"Authorization":`Bearer ${TOKEN}`}
            }
        )
            .then((res)=>{
                setData(res.data.order)
                axios.post(`${baseUrl}products/ids`,{
                    ids:res.data.order?.products?.map((item:any)=>item.productId)
                })
                    .then((res)=>{
                        setProducts(res?.data?.products)
                        setLoading(false)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })

            })

            .catch((err)=>{
                console.log(err)
            })
    }

    useEffect(()=>{
        getOneOrder()
    },[])
    return (
        <section className={'one_order'}>
            {!loading?
                <div className="container">
                    <div className="card">
                        <div className="top">
                            <h2>Ariza qabul qilindi !!!</h2>
                            <p>Tanlovingiz uchun tashakkur. Sizning buyurtmangizni qabul qildik🙂</p>
                        </div>
                        <div className={data?.status===0?"progress status":data?.status===1?'canceled status':"end status"}>
                            <p>Holat:</p>
                            <span>{data?.status===0?"Progressda":data?.status===1?'Bekor qilindi':"Yakunlandi"}</span>
                        </div>
                        <div className="rows">
                            <div className="col-2">
                                <h6>To'lov usuli</h6>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    {
                                        data?.paymentType===0?
                                            <svg width="24" height="15" viewBox="0 0 24 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 2C24 0.89543 23.1046 0 22 0H2C0.89543 0 0 0.895431 0 2V13C0 14.1046 0.895431 15 2 15H22C23.1046 15 24 14.1046 24 13V2Z" fill="#4DCFE0"></path><path d="M21.0191 4.63103C20.0955 4.60306 19.3398 3.87535 19.3119 2.95173C19.3119 2.64385 19.06 2.41992 18.7521 2.41992H5.23373C4.92585 2.41992 4.70192 2.64385 4.67396 2.95173C4.61798 3.87535 3.8623 4.60306 2.93867 4.63103C2.6308 4.63103 2.37891 4.88292 2.37891 5.1908V9.44501C2.37891 9.75289 2.6308 10.0048 2.93867 10.0048C3.89026 10.0327 4.64594 10.7605 4.67396 11.6841C4.67396 11.992 4.92585 12.2159 5.23373 12.2159H18.7241C19.032 12.2159 19.2559 11.992 19.2839 11.6841C19.3398 10.7605 20.0955 10.0328 21.0191 10.0048C21.327 10.0048 21.5789 9.75289 21.5789 9.44501V5.1908C21.5789 4.88292 21.327 4.63103 21.0191 4.63103Z" fill="#00BBD3"></path><path d="M18.5564 6.22656C17.9407 6.22656 17.4648 6.70238 17.4648 7.31813C17.4648 7.93388 17.9686 8.40971 18.5564 8.40971C19.1441 8.40971 19.648 7.90592 19.648 7.31813C19.6479 6.73035 19.1722 6.22656 18.5564 6.22656Z" fill="#4DCFE0"></path><path d="M6.4932 7.31813C6.4932 6.7304 6.01738 6.22656 5.40163 6.22656C4.78588 6.22656 4.31006 6.70238 4.31006 7.31813C4.31006 7.93388 4.78588 8.40971 5.40163 8.40971C6.01738 8.40971 6.4932 7.90592 6.4932 7.31813Z" fill="#4DCFE0"></path><path d="M12.6508 5.05172C12.4268 4.99574 12.203 4.96777 11.9511 4.96777C11.6992 4.96777 11.4753 4.99574 11.2514 5.07974C10.4957 5.33163 9.87995 5.94738 9.68404 6.67509C9.62806 6.89902 9.6001 7.1229 9.6001 7.37479C9.6001 7.62668 9.62806 7.85061 9.71206 8.07449C9.96395 8.83017 10.5797 9.44592 11.3074 9.64183C11.5313 9.69781 11.7552 9.72577 12.0071 9.72577C12.259 9.72577 12.4829 9.69781 12.7068 9.61381C13.4625 9.36192 14.0782 8.74617 14.2742 8.01845C14.3301 7.79452 14.3581 7.57065 14.3581 7.31876C14.3581 7.06686 14.3301 6.84293 14.2461 6.61906C13.9942 5.86338 13.3785 5.24763 12.6508 5.05172Z" fill="#D4E1F4"></path></svg>
                                            :
                                            data?.paymentType===1?
                                                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" rx="2" fill="url(#paint0_linear)"></rect><path d="M1 3.22656H23.2609V5.96884H1V3.22656Z" fill="url(#paint1_linear)"></path><path d="M11.0013 10.5662H4.46817C4.02273 10.5662 3.66162 10.2051 3.66162 9.75968C3.66162 9.31423 4.02273 8.95312 4.46817 8.95312H11.0013C11.4467 8.95312 11.8078 9.31423 11.8078 9.75968C11.8078 10.2051 11.4467 10.5662 11.0013 10.5662Z" fill="#B9ACAC"></path><defs><linearGradient id="paint0_linear" x1="16.3752" y1="23.91" x2="26.9289" y2="0.971786" gradientUnits="userSpaceOnUse"><stop stopColor="#8F86C0"></stop><stop offset="1" stopColor="#C7C3DF"></stop></linearGradient><linearGradient id="paint1_linear" x1="56.6213" y1="11.6185" x2="56.8139" y2="-1.06985" gradientUnits="userSpaceOnUse"><stop stopColor="#816A6A"></stop><stop offset="1" stopColor="#9D8B8B"></stop></linearGradient></defs></svg>
                                                :
                                                <img src={apelsin} alt=""/>
                                    }
                                    <span>{data?.paymentType===0?'Naqd':data?.paymentType===1?"Termianl":"Apelsin"}</span>
                                </div>
                            </div>
                            <div className="col-2">
                                <h6>Buyurtma sanasi</h6>
                                <span>{data?.createdAt?.slice(0,10)}</span>
                            </div>
                            <div className="col-2">
                                <h6>Umumiy summa</h6>
                                {data?.allSum && <span>{data?.receptionType === 0 ? priceToString(data?.allSum) : data?.receptionType === 1 ? priceToString(data?.allSum + 30000) : priceToString(data?.allSum + 50000)} so'm</span>}
                            </div>
                        </div>
                        <div className="products_order">
                            <div className="table_div">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Mahsulot nomi</th>
                                        <th>Narx</th>
                                        <th>Miqdor</th>
                                        <th>Umumiy summa</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products.map((item,i)=>{
                                        return(
                                            <tr key={i}>
                                                <td>{item.title}</td>
                                                <td>{priceToString(item.price)} so'm</td>
                                                <td>{data?.products.filter((el)=>el.productId==item._id)[0].quantity} ta</td>
                                                {
                                                    data?.products&&
                                                    <td>{priceToString(item.price * (data?.products?.filter((el) => el?.productId == item?._id)[0]?.quantity))} so'm</td>
                                                }
                                            </tr>
                                        )
                                    })}

                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                {products?.map((item:any,i:any)=>{
                                    return(
                                        <div key={i}  className="card">
                                            <div className="info">
                                                <h6>Mahsulot Nomi:</h6>
                                                <span>{item.title}</span>
                                            </div>
                                            <div className="info">
                                                <h6>Narx:</h6>
                                                <span>{priceToString(item.price)} so'm</span>
                                            </div>
                                            <div className="info">
                                                <h6>Miqdor:</h6>
                                                <span>{data?.products.filter((el)=>el.productId==item._id)[0].quantity} ta</span>
                                            </div>
                                            <div className="info">
                                                <h6>Umumiy:</h6>
                                                <span>{
                                                    data?.products&&
                                                    <td>{priceToString(item.price * (data?.products?.filter((el) => el?.productId == item?._id)[0]?.quantity))} so'm</td>
                                                }</span>
                                            </div>


                                        </div>
                                    )
                                })}
                            </div>
                            <div className="sum">
                                { <h3>Yetkazib berish: {data?.receptionType === 0 ? 0 : data?.receptionType === 1 ? priceToString(30000) : priceToString(50000)} so'm</h3>}
                                {data?.allSum &&
                                    <h2>Umumiy:{data?.receptionType === 0 ? priceToString(data?.allSum) : data?.receptionType === 1 ? priceToString(data?.allSum + 30000) : priceToString(data?.allSum + 50000)} so'm</h2>}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <PageLoad/>
            }
        </section>
    );
};

export default OneOrder;
