import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Auth';
import MailStore from "./MailStore";

const store = configureStore({
    reducer:{
        auth:AuthReducer,
        mail:MailStore
    }
})

export default store;