import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name:'mail',
    initialState:{
        sent:[],
        inBox:[],
        inboxIndex:1,
        mailDetails:null
    },
    reducers:{
        rePlace(state,action){
            state.sent= Object.values(action.payload.sent)
            const resivekeys =Object.values(action.payload.resive)
            for(var key in resivekeys){
                const value = Object.values(resivekeys[key])
                state.inBox.push(value[0])
            }
        },
        rePlaceInbox(state,action){
            state.inBox=action.payload
        },
        sendMail(state,action){
            state.sentIndex++
            state.sent.push(action.payload)
        },
        inBoxMail(state,action){
            state.inboxIndex++
            state.inBox.push(action.payload)
        },
        mailInDetail(state,action){
            state.mailDetails=action.payload
        },
        mailread(state,action){
            const mailInd = state.inBox.findIndex(mail=>mail.id===action.payload)
            state.inBox[mailInd].readMail = true
        }
    }
})

export const mailActions = mailSlice.actions

export default mailSlice.reducer