import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {baseUrl} from "../../variable";

type User={
    user:{
        fullName:string,
        _id:string,
        phone:number,
        locus?:string,
        password?:string,
        passportId?:string,
        salary?:number,
        workLocus?:string,
        image?:string,
        __v?:number,
    }
}

type UserState={
    status:"loading" | "success" | "reject",
    error:string | null,
    list:User
}

type message=String

const initialState: UserState = {
    list:{
        user:{
            fullName:"",
            _id:'',
            phone:0
        }
    },
    error: null,
    status: "loading",
};

export const getUser=createAsyncThunk(
    'getUser',
   async (token:any) => {
        const response =await fetch(`${baseUrl}user/me`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        const data:User=await response.json()
        return data
   }
)

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getUser.pending,(state)=>{
            state.status='loading',
            state.error=null
        });
        builder.addCase(getUser.fulfilled,
            (state,action)=>{

                const userObj:User=action.payload

                state.list=userObj
                state.status="success"
            });
        builder.addCase(getUser.rejected,
            (state, { payload}) => {

                console.log(payload);

                if (payload) state.error = 'reject';
                state.status = "reject";

            });
    }
})

export default userSlice.reducer

