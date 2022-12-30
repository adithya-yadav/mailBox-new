import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sent: [],
    inBox: [],
    inboxIndex: 0,
    mailDetails: null,
  },
  reducers: {
    rePlace(state, action) {
      if (action.payload.sent) {
        const sentmail = action.payload.sent;
        for (const key in sentmail) {
          sentmail[key]["id"] = key;
          state.sent.push(sentmail[key]);
        }
      }
      if (action.payload.resive) {
        const resivekeys = Object.values(action.payload.resive);
        for(const key in resivekeys){
            const value = Object.values(resivekeys[key])[0]
            state.inBox.push(value)
            if(!value.readMail){
                state.inboxIndex++
            }
        }
      }
      if(action.payload.resivemailsInevery2Secound){
        state.inBox=[]
        state.inboxIndex=0
        const resivekeys = Object.values(action.payload.resivemailsInevery2Secound);
        for(const key in resivekeys){
            const value = Object.values(resivekeys[key])[0]
            state.inBox.push(value)
            if(!value.readMail){
                state.inboxIndex++
            }
        }
      }
    },
    sendMail(state, action) {
      state.sentIndex++;
      state.sent.push(action.payload);
    },
    inBoxMail(state, action) {
      state.inboxIndex++;
      state.inBox.push(action.payload);
    },
    mailInDetail(state, action) {
      state.mailDetails = action.payload;
    },
    mailread(state, action) {
      const mailInd = state.inBox.findIndex(
        (mail) => mail.id === action.payload
      );
      if (!state.inBox[mailInd].readMail) {
        state.inboxIndex--;
        state.inBox[mailInd].readMail = true;
      }
    },
    deleteMail(state, action) {
      if (action.payload.path === "/Home/Sent") {
        const sentInd = state.sent.findIndex(
          (mail) => mail.id === action.payload.id
        );
        state.sent.splice(sentInd, 1);
      } else {
        const sentInd = state.inBox.findIndex(
          (mail) => mail.id === action.payload.id
        );
        state.inBox.splice(sentInd, 1);
      }
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
