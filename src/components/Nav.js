import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import LoginSignup from "./LoginSignup./LoginSignup";
import Home from "./pages/Home";
import Send from "./pages/Send";


const Nav = () => {
    const isLogin = useSelector(state=>state.auth.isLogin)
  return (
    <Fragment>
      {isLogin && (
        <>
        <Route path="/Send">
          <Send />
        </Route>
        <Route path="/Home">
          <Home/>
        </Route>
        <Route path="*">
        <Redirect to="/Home"/>
      </Route>
        </>
      )}

      {!isLogin && (
        <>
          <Route path="/loginSignup">
            <LoginSignup />
          </Route>
          <Route path="*">
            <Redirect to="/loginSignup" />
          </Route>
        </>
      )}
    </Fragment>
  );
};

export default Nav;