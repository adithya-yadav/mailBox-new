import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromFirebase, resiveMailsformFirebase } from "./components/apis/api";
import Nav from "./components/Nav";

function App() {
  const email = localStorage.getItem('email')
  const selectMailbox = useSelector(state=>state.mail)
  console.log(selectMailbox)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getDataFromFirebase())
  },[email])
  useEffect(()=>{
    const intervel = setInterval(()=>{
      resiveMailsformFirebase(dispatch)
    },2000)
    return()=>{
      clearInterval(intervel)
    }
  },[email])
  return (
    <div>
      <Nav/>
    </div>
  );
}

export default App;