import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit";

export interface LikeState{
    like:any
}

const initialState:LikeState={
    like:[]
}

export const likeSlice=createSlice({
    name:"like",
    initialState,
    reducers:{
        addToLike:(state,action:PayloadAction<any>)=>{
            const itemInCart:any=state.like.find((item:any)=>item?._id ===action.payload._id);
            if (itemInCart){
                itemInCart.isLike=true
            }else {
                state.like.push({...action.payload,isLike:true})
            }
        },
        removeItem: (state, action:PayloadAction<any>) => {
            const removeItem = state.like.filter((item:any) => item._id !== action.payload);
            state.like = removeItem;
        }
    }
})

// export const likeReducer = likeSlice.reducer;
export default likeSlice.reducer;
export const {
    addToLike,
    removeItem
}=likeSlice.actions;