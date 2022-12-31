import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDataFromFirebase, resiveMailsformFirebase } from "../components/apis/api";

const useReload = (isLogin,emailId) => {
  const dispatch = useDispatch()
  let interval;
  useEffect(()=>{
    if(isLogin && emailId){
      console.log("createdddd")
       interval = setInterval(()=>{
        resiveMailsformFirebase(dispatch)
      },2000)
      dispatch(getDataFromFirebase(emailId.replace(".", "").replace(".", "").replace("@", "")))
    }
    return ()=>{
      console.log("clearrr")
      if(isLogin){
        clearInterval(interval);
      }
    }
  },[isLogin])
};

export default useReload;
