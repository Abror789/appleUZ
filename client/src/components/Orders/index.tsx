import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl, TOKEN} from "../../Redux/variable";
import {priceToString} from "../../utils/price";
import PageLoad from "../PageLoad";
import {useNavigate} from "react-router-dom";


const Orders = () => {
    const [orders,setOrders]=useState<any>([])
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()

    useEffect(()=>{
        getAllOrders()
    },[])
    const getAllOrders=()=>{
        axios.get(`${baseUrl}orders/mine`,
            {headers:{"Authorization":`Bearer ${TOKEN}`}})
            .then((res)=>{
                // console.log(res)
                setOrders(res.data.orders)
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setLoading(false)
            })
    }
    return (
        <section className={"orders"}>
            {!loading?
                <div className="container">
                    <h1 className={"order_title"}>Buyurtmalar tarixi</h1>
                    {orders.length>=1?
                        <>
                            <div className="table_div">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>T/r</th>
                                        <th>Id</th>
                                        <th>Miqdor</th>
                                        <th>Sana</th>
                                        <th>Holat</th>
                                        <th>Umumiy Summa</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders?.map((item:any,i:any)=>{
                                        return(
                                            <tr onClick={()=>{
                                                navigate(`/orders/${item._id}`)
                                            }} key={i} style={{cursor:"pointer"}}>
                                                <td>{i+1}</td>
                                                <td>{item._id}</td>
                                                <td>{item?.products?.reduce((a:any,b:any)=>a+(b?.quantity || 0),0)} ta</td>
                                                <td>{item?.createdAt?.slice(0,10)}</td>
                                                <td className={item.status===0?"progress status":item.status===1?'canceled status':"end status"}>
                                                    <div>{item.status===0?"Progressda":item.status===1?'Bekor qilindi':"Yakunlandi"}</div>
                                                </td>
                                                <td>{priceToString(item?.allSum)} so'm</td>
                                            </tr>
                                        )
                                    })}

                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                {orders?.map((item:any,i:any)=>{
                                    return(
                                        <div key={i} onClick={()=>{
                                            navigate(`/orders/${item._id}`)
                                        }} className="card">
                                            <div className="info">
                                                <h6>T/r:</h6>
                                                <span>{i+1}</span>
                                            </div>
                                            <div className="info">
                                                <h6>Id:</h6>
                                                <span>{item._id}</span>
                                            </div>
                                            <div className="info">
                                                <h6>Miqdor:</h6>
                                                <span>{item?.products?.reduce((a:any,b:any)=>a+(b?.quantity || 0),0)} ta</span>
                                            </div>
                                            <div className="info">
                                                <h6>Sana:</h6>
                                                <span>{item?.createdAt?.slice(0,10)}</span>
                                            </div>
                                            <div className="info">
                                                <h6>Holat:</h6>
                                                <span className={item.status===0?"progress status":item.status===1?'canceled status':"end status"}>
                                                    <div>{item.status===0?"Progressda":item.status===1?'Bekor qilindi':"Yakunlandi"}</div></span>
                                            </div>
                                            <div className="info">
                                                <h6>Umumiy:</h6>
                                                <span>{priceToString(item?.allSum)} so'm</span>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                        </>
                        :
                        <div className="no_data">
                            <h6>Siz hali mahsulot buyurtma qilmagansiz</h6>
                            <button onClick={()=>navigate('/')}>Hoziroq buyurtma qiling</button>
                        </div>
                    }


                </div>
                :
                <PageLoad/>
            }

        </section>
    );
};

export default Orders;
