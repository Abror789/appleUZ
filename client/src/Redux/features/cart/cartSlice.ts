import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit";

export interface CartState{
    cart:any
}

const initialState:CartState={
    cart:[]
}

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<any>)=>{
            const itemInCart:any=state.cart.find((item:any)=>item?._id ===action.payload._id);
            if (itemInCart){
                itemInCart.quantity++
            }else {
                state.cart.push({...action.payload,quantity:1})
            }
        },
        incrementQuantity:(state,action:PayloadAction<any>)=>{
            const item=state.cart.find((item:any)=>item._id===action.payload)
            item.quantity++
        },
        decrementQuantity:(state,action:PayloadAction<any>)=>{
            const item = state.cart.find((item:any) => item._id === action.payload);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;
            }
        },
        removeItem: (state, action:PayloadAction<any>) => {
            const removeItem = state.cart.filter((item:any) => item._id !== action.payload);
            state.cart = removeItem;
        },
        removeAllItem:(state)=>{
            state.cart=[]
        }
    }
})


export const cartReducer = cartSlice.reducer;
export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    removeAllItem
} = cartSlice.actions;
