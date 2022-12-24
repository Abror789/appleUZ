import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {addToCart,incrementQuantity,removeItem} from "../Redux/features/cart/cartSlice";
import { useSelector } from 'react-redux'

const Button = () => {
    const cart = useSelector((state:any) => state.cartReducer.cart)
    const dispatch=useDispatch()
    useEffect(()=>{
        console.log(cart)
    })
    return (
        <div>
          <button onClick={()=>{
              dispatch(addToCart({id:1,title:2}))
          }}>
              Add to cart
          </button>
            <button onClick={()=>{
                dispatch(addToCart({id:2,title:4}))
            }}>
                Add to cart2
            </button>

            <button onClick={()=>{
                dispatch(incrementQuantity(2))
            }}>
                increment second product
            </button>
             <button onClick={()=>{
                 dispatch(removeItem(1))
             }}>
                 delete first product
             </button>
        </div>
    );
};

export default Button;
