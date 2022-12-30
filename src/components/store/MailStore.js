import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name:'mail',
    initialState:{
        sent:[],
        inBox:[],
        inboxIndex:0,
        mailDetails:null
    },
    reducers:{
        rePlace(state,action){
            const sentmail = action.payload.sent
            const resivekeys =Object.values(action.payload.resive)
            for(const key in sentmail){
                sentmail[key]['id']=key
                state.sent.push(sentmail)
            }
            const id = Object.values(resivekeys[0])[0].id
            const sentKeys = Object.values(action.payload.sent)
            sentKeys[0]["id"] = id
            state.sent= Object.values(sentKeys)
            for(var key in resivekeys){
                const value = Object.values(resivekeys[key])
                if(value[0].readMail === false){
                    state.inboxIndex++
                }
                state.inBox.push(value[0])
            }
        },
        sendMail(state,action){
            console.log(action.payload)
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
            if(!state.inBox[mailInd].readMail){
                state.inboxIndex--
                state.inBox[mailInd].readMail = true
            }
        },
        deleteMail(state,action){
            if(action.payload.path === "/Home/Sent"){
                const sentInd = state.sent.findIndex(mail=>mail.id === action.payload.id)
                state.sent.splice(sentInd,1)
            }else{
                const sentInd = state.inBox.findIndex(mail=>mail.id === action.payload.id)
                state.inBox.splice(sentInd,1)
            }
        }
    }
})

export const mailActions = mailSlice.actions

export default mailSlice.reducer