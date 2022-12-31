import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getDataFromFirebase } from "../components/apis/api"

const useGetData = (isLogin,emailId)=>{
    const dispatch = useDispatch()
     useEffect(()=>{
    if(isLogin && emailId){
      dispatch(getDataFromFirebase(emailId.replace(".", "").replace(".", "").replace("@", "")))
    }
  },[isLogin,emailId])
}

export default useGetData