import { configureStore } from "@reduxjs/toolkit";
import userimageReducer from "../features/userimageReducer";
import userReducer from '../features/userSlice'
import usernameReducer from "../features/usernameReducer";




export default configureStore({
    reducer:{
        user:userReducer,
        username:usernameReducer
        ,
         userImage:userimageReducer,

    }
})