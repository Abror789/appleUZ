import React, {useEffect, useState} from 'react';
import {addToLike, removeItem} from "../../Redux/features/like/likeSlice";
import {Link, useLocation, useParams} from "react-router-dom";
import {baseUrl, fileUrl} from "../../Redux/variable";
import {priceToString} from "../../utils/price";
import {addToCart, decrementQuantity, incrementQuantity} from "../../Redux/features/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
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

const SearchList = () => {
    const dispatch=useDispatch<any>()
    const location=useLocation()
    const [data,setData]=useState<Products>([])
    const text=location.search.slice(6)
    const [loading,setLoading]=useState(false)

   useEffect(()=>{
       setLoading(true)
       if (text.length>=1){
           axios.get(`${baseUrl}products/filter/items?text=${text}`)
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
   },[location.search])
    const cart = useSelector((state:any) => state.cartReducer.cart)
    const like = useSelector((state:any) => state.like.like)

    const newArr=cart?.map((item:any)=>item._id)
    const newArrLike=like?.map((item:any)=>item._id)

    const getQ = (id:any) => {
        const filterArr=cart.filter((el:any)=>el._id===id)
        return filterArr[0].quantity
    }
    const list:any=[]
    return (
       <>
           {loading
               ?
                <PageLoad/>
               :
               <div className={"product_list"}>
                   <div className="product_list_list">
                       <h1 className={'search_title'}>Qidiruv natijalari</h1>
                       <div className="container">
                           {data.length>=1?
                               <div className="list_data">
                                   <div className="list_row">
                                       {data?.map((item,i)=>{
                                           const linkName=item.title.split(' ').join('-').replace("/","-")

                                           return(
                                               <div key={i} className="col_4">
                                                   <div className="card">

                                                       {
                                                           newArrLike.includes(item._id)
                                                               ?
                                                               <button onClick={()=>{
                                                                   dispatch(removeItem(item._id))
                                                               }} className={"heart"}>
                                                                   <svg width={24} height={24} className="MuiSvgIcon-root"
                                                                        focusable="false"
                                                                        viewBox="0 0 24 24" aria-hidden="true">
                                                                       <path
                                                                           d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                                                   </svg>
                                                               </button>
                                                               :
                                                               <button onClick={()=>{
                                                                   dispatch(addToLike({...item}))
                                                               }} className='heart none_svg'>
                                                                   <svg width={24} height={24} className="MuiSvgIcon-root MuiSvgIcon-colorAction"
                                                                        focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                                                       <path
                                                                           d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                                                                   </svg>
                                                               </button>
                                                       }





                                                       <div className={"product_link"}>

                                                           <Link to={`/product/${linkName}?${item._id}`}>
                                                               <div className="list_card_img">
                                                                   <img src={`${fileUrl}${item.images[0]}`} alt={item.title}/>
                                                               </div>
                                                           </Link>
                                                           <div className="list_card_details">
                                                               <Link to={`/product/${linkName}?${item._id}`}>
                                                                   <h3>{item.title}</h3>
                                                               </Link>
                                                               <span>{priceToString(item.price)} so'm dan</span>
                                                               {! (newArr?.includes(item._id))
                                                                   ?
                                                                   <button onClick={()=>{
                                                                       dispatch(addToCart({...item}))
                                                                   }} className={"add_to_btn"}>
                                                                       <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M1.33301 1.74999C1.33301 1.24373 1.74342 0.833313 2.24969 0.833313H4.71301C5.14707 0.833313 5.52164 1.13774 5.61034 1.56264L6.22362 4.50004H17.8333C18.8458 4.50004 19.6666 5.32086 19.6666 6.3334V10.298C19.6666 11.166 19.0581 11.9149 18.2086 12.0926L8.24725 14.1761C7.25609 14.3833 6.28456 13.7479 6.07735 12.7567L3.96795 2.66668H2.24969C1.74342 2.66668 1.33301 2.25626 1.33301 1.74999ZM7.68189 11.4846C7.78538 11.9803 8.27118 12.2982 8.76684 12.1946L17.1042 10.4513C17.5289 10.3625 17.8333 9.98794 17.8333 9.55398V7.25008C17.8333 6.74382 17.4229 6.3334 16.9166 6.3334H6.6064L7.68189 11.4846Z" fill="#fff"></path><path d="M7.16669 19.1666C8.08718 19.1666 8.83338 18.4204 8.83338 17.4999C8.83338 16.5795 8.08718 15.8333 7.16669 15.8333C6.2462 15.8333 5.5 16.5795 5.5 17.4999C5.5 18.4204 6.2462 19.1666 7.16669 19.1666Z" fill="#ffff"></path><path d="M15.4997 19.1666C16.4202 19.1666 17.1664 18.4204 17.1664 17.4999C17.1664 16.5795 16.4202 15.8333 15.4997 15.8333C14.5792 15.8333 13.833 16.5795 13.833 17.4999C13.833 18.4204 14.5792 19.1666 15.4997 19.1666Z" fill="#fff"></path></svg>
                                                                       Savatchaga
                                                                   </button>
                                                                   :
                                                                   <div className={"quantity"}>
                                                                       <div className={"quantityInner"}>
                                                                           <button disabled={getQ(item._id)==1} onClick={()=>{
                                                                               dispatch(decrementQuantity(item._id))
                                                                           }}>
                                                                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                                                   <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                                               </svg>
                                                                           </button>
                                                                           <div>
                                                                               <div>{getQ(item._id)}</div>
                                                                           </div>
                                                                           <button onClick={()=>{
                                                                               dispatch(incrementQuantity(item._id))
                                                                           }}>
                                                                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                                                   <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                                               </svg>
                                                                           </button>
                                                                       </div>
                                                                   </div>
                                                               }


                                                           </div>

                                                       </div>
                                                   </div>
                                               </div>
                                           )
                                       })}
                                   </div>
                               </div>
                               :
                               <div className={"no_search_data"}>
                                   So'rov bo'yicha mahsulot topilmadi😕
                               </div>
                           }
                       </div>
                   </div>
               </div>
           }
       </>
    );
};

export default SearchList;
