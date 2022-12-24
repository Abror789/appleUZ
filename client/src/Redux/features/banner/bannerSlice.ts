import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {baseUrl} from "../../variable";

type Banner={
    _id:String,
    title:String,
    desc?:String,
    source:String,
    isShow:Boolean,
    createdAt:String,
    updatedAt:String,
    __v:Boolean
}

type BannerState={
    status:"loading" | "success" | "reject",
    error:string | null,
    list:Banner[]
}
type message=String

const initialState: BannerState = {
    list: [],
    error: null,
    status: "loading",
};


export const getBanner=createAsyncThunk(
    'getBanner',
    async ()=>{
        const response=await fetch(`${baseUrl}banners`)
        const data:Banner[]=await response.json()
        return data
    }
)

export const bannerSlice=createSlice({
    name:"banner",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getBanner.pending, (state) => {
            // At that moment,
            // we change status to `loading`
            // and clear all the previous errors:
            state.status = "loading";
            state.error = null;
        });

        // When a server responses with the data,
        // `fetchTodos.fulfilled` is fired:
        builder.addCase(getBanner.fulfilled,
            (state, action) => {
                // We add all the new todos into the state
                // and change `status` back to `idle`:
                const bannerObj:any=action?.payload
                const banners:Banner[]=bannerObj.banners


                state.list=banners;
                state.status = "success";
            });

        // When a server responses with an error:
        builder.addCase(getBanner.rejected,
            (state, { payload}) => {
                // We show the error message
                // and change `status` back to `idle` again.
                if (payload) state.error = 'reject';
                state.status = "reject";
            });
    }
})

export default bannerSlice.reducer
