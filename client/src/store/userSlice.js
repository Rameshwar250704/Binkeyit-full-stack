import { createSlice } from "@reduxjs/toolkit";

const initialValue={
    _id:"",
    name:"",
    email:"",

}

const userSlice=createSlice({
    name:"user",
    initialState : initialValue,
    reducers:{
        setUserDetails:(state,action)=>{
            state.name=action.payload?.name
               state._id=action.payload?._id
                  state.email=action.payload?.email
                   state.avatar=action.payload?.avatar
                    state.mobile=action.payload?.mobile
                     state.status=action.payload?.status
                      state.order_history=action.payload?.order_history
                       state.role=action.payload?.role
                      state.shopping_cart=action.payload?.shopping_cart
                       state.verify_email=action.payload?.verify_email
                       

        },

        updateavatar:(state,action)=>{
            state.avatar=action.payload

        },
        logout:(state,action)=>{
            state.name=""
               state._id=""
                  state.email=""
                   state.avatar=""
                    state.mobile=""
                     state.status=""
                     state.shopping_cart=[]
                     state.order_history=[]

        }
    }
})
    
export const {setUserDetails,logout,updateavatar}=userSlice.actions

export default userSlice.reducer