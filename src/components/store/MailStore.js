import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name:'mail',
    initialState:{
        sent:[],
        inBox:[]
    },
    reducers:{
        sendMail(state,action){
            state.sent.push(action.payload)
        },
        inBoxMail(state,action){
            state.inBox.push(action.payload)
        }
    }
})

export const mailActions = mailSlice.actions

export default mailSlice.reducer