import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromFirebase, resiveMailsformFirebase } from "./components/apis/api";
import Nav from "./components/Nav";
import useReload from "./CustomHooks/use-Reload";

function App() {
  const selectMailbox = useSelector(state=>state.mail)
  const isLogin = useSelector(state=>state.auth.isLogin)
  const emailId = localStorage.getItem('email')
  console.log(selectMailbox)

  useReload(isLogin,emailId)
  
  return (
    <div>
      <Nav/>
    </div>
  );
}

export default App;