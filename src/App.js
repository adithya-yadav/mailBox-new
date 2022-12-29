import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromFirebase } from "./components/apis/api";
import Nav from "./components/Nav";

function App() {
  const email = localStorage.getItem('email')
  const selectMail = useSelector(state=>state.mail)
  console.log(selectMail)
  const dispatch = useDispatch()
  useEffect(()=>{
    getDataFromFirebase(dispatch)
  },[email])
  return (
    <div>
      <Nav/>
    </div>
  );
}

export default App;