import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {priceToString} from "../../utils/price";
import {allQuantity,allSum} from "../../utils/allQuantity";
import {decrementQuantity, incrementQuantity, removeItem} from "../../Redux/features/cart/cartSlice";

type CartItem={
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
    quantity:number,
    __v:number
}

const Cart = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const cart = useSelector((state:any) => state.cartReducer.cart)

    const getQ = (id:any) => {
        const filterArr=cart.filter((el:any)=>el._id===id)
        return filterArr[0].quantity
    }
    const allSumProduct=allSum()
    return (
       <>
           <section className={"cart_page"}>
               <div className="container">
                   <div className="cart_wrapper">
                       <div className="cart_title">
                           <h1>Savatchada {allQuantity() || 0} ta mahsulot bor</h1>
                       </div>
                       <div className={cart?.length>=1?"row":"row row_none"}>
                           <div className="left">
                               <div className="cart_inner">
                                   {cart?.length<=0 && <div className="no_cart">
                                       <img className={"no_cart_img"} src="https://macbro.uz/images/no_cart_item.png" alt=""/>
                                       <p className={"no_cart_text"}>Siz hali savatingizga biron bir mahsulot qo'shmadingiz</p>
                                       <button className={"no_cart_button"} onClick={() => {
                                           navigate('/')
                                       }}>Hoziroq buyurtma qiling
                                       </button>
                                   </div>}
                                   {cart?.length>=0&&<>
                                       {cart.map((item: CartItem, i: number) => {
                                           const linkName=item.title.split(' ').join('-').replace("/","-")
                                           return (
                                               <div key={i} className={"cart_items"}>
                                                   <div className={"cart_item"}>
                                                       <Link className={"cart_item_img"} to={`/product/${linkName}?${item._id}`}>
                                                           <img src={`http://localhost:5000/images/${item.images[0]}`}
                                                                alt={item.title}/>
                                                       </Link>
                                                       {/*<Link to={`/product/${linkName}?${item._id}`}>*/}
                                                       {/*    <h3>{item.title}</h3>*/}
                                                       {/*</Link>*/}
                                                       <Link className={"cart_details"} to={`/product/${linkName}?${item._id}`}>
                                                           <p className="cart_title">
                                                               {item.title}
                                                           </p>
                                                       </Link>
                                                       <div className="cart_quantity">
                                                           <button disabled={getQ(item._id)==1} onClick={() => {
                                                               dispatch(decrementQuantity(item._id))
                                                           }}>
                                                               <svg width={24} height={24} className="MuiSvgIcon-root"
                                                                    focusable="false" viewBox="0 0 24 24"
                                                                    aria-hidden="true">
                                                                   <path d="M19 13H5v-2h14v2z"></path>
                                                               </svg>
                                                           </button>
                                                           <div>
                                                               <div>
                                                                   <div>{getQ(item._id)}</div>
                                                               </div>
                                                           </div>
                                                           <button onClick={() => {
                                                               dispatch(incrementQuantity(item._id))
                                                           }}>
                                                               <svg width={24} height={24} className="MuiSvgIcon-root"
                                                                    focusable="false" viewBox="0 0 24 24"
                                                                    aria-hidden="true">
                                                                   <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                               </svg>
                                                           </button>
                                                       </div>
                                                       <div className="cart_total">
                                                           {priceToString((getQ(item._id) * item.price))} so'm
                                                       </div>
                                                       <div className="cart_trash">
                                                           <button onClick={() => {
                                                               dispatch(removeItem(item._id))
                                                           }}>
                                                               <svg width={24} height={24} className="MuiSvgIcon-root"
                                                                    focusable="false" viewBox="0 0 24 24"
                                                                    aria-hidden="true">
                                                                   <path
                                                                       d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                                               </svg>
                                                           </button>
                                                       </div>
                                                   </div>
                                               </div>
                                           )
                                       })}

                                   </>}
                               </div>
                           </div>
                           <div className="right">
                               <div className="right_inner">
                                   <div className="right_info">
                                       <p>Mahsulotlar (<span>{allQuantity()})</span></p>
                                       <p>{priceToString(allSum())}</p>
                                   </div>
                                   <div className="right_totalPrice">
                                       <p>Umumiy</p>
                                       <p>{priceToString(allSumProduct)}  so'm</p>
                                   </div>
                                   <button onClick={()=>{
                                       navigate('/checkout')
                                   }}>To'lovga o'tish</button>
                                   <button onClick={()=>{
                                       navigate('/')
                                   }}>Menyuga qaytish</button>
                               </div>
                           </div>
                       </div>

                   </div>
               </div>
           </section>
       </>
    );
};

export default Cart;
