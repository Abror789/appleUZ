import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {baseUrl} from "../../variable";

type Banner={
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
}

type BannerState={
    status:"loading" | "success" | "reject",
    error:string | null,
    list:Banner[]
}


const initialState: BannerState = {
    list: [],
    error: null,
    status: "loading",
};


export const getProduct=createAsyncThunk(
    'getProduct',
    async (query:any)=>{
        const response=await fetch(`${baseUrl}products${query}`)
        const data:Banner[]=await response.json()
        return data
    }
)

export const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getProduct.pending, (state) => {
            // At that moment,
            // we change status to `loading`
            // and clear all the previous errors:
            state.status = "loading";
            state.error = null;
        });

        // When a server responses with the data,
        // `fetchTodos.fulfilled` is fired:
        builder.addCase(getProduct.fulfilled,
            (state, action) => {
                // We add all the new todos into the state
                // and change `status` back to `idle`:
                const bannerObj:any=action?.payload
                const banners:Banner[]=bannerObj.products
                // console.log(banners)

                state.list=banners;
                state.status = "success";
            });

        // When a server responses with an error:
        builder.addCase(getProduct.rejected,
            (state, { payload}) => {
                // We show the error message
                // and change `status` back to `idle` again.
                if (payload) state.error = 'reject';
                state.status = "reject";
            });
    }
})

export default productSlice.reducer
