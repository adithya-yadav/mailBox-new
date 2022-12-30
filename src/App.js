import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromFirebase } from "./components/apis/api";
import Nav from "./components/Nav";

let isInitial = true

function App() {
  const email = localStorage.getItem('email')
  const selectMailbox = useSelector(state=>state.mail)
  console.log(selectMailbox)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getDataFromFirebase())
  },[email])

  return (
    <div>
      <Nav/>
    </div>
  );
}

export default App;