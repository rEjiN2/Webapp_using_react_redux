import { createSlice } from "@reduxjs/toolkit";
const userimageSlice=createSlice({
    name:'userImage',
    initialState:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    reducers:{
        changeImage:(state,action)=>{
            return action.payload
        }
    }
   
})

export const {changeImage}=userimageSlice.actions

export default userimageSlice.reducer;