import {useSelector} from "react-redux";



export const allQuantity=()=>{
    const cart = useSelector((state:any) => state.cartReducer.cart)
    return cart.reduce((a:any,b:any)=>a+(b?.quantity || 0),0)
}
export const allSum=()=>{
    const cart = useSelector((state:any) => state.cartReducer.cart)
    return cart.reduce((a:any,b:any)=>a+(b?.price*b?.quantity || 0),0)
}
