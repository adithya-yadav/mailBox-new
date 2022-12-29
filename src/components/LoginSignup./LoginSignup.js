import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginorSigninToFirebase } from "../apis/api";
import { authActions } from "../store/Auth";
import classes from "./LoginSignup.module.css";

const LoginSignup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const dispatch = useDispatch();
  const changePageHandler = () => {
    if (isLoginPage) {
      setIsLoginPage(false);
    } else {
      setIsLoginPage(true);
    }
  };
  const onSubmitDetailsHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if(!isLoginPage){
      const confirmPassword = confirmPasswordRef.current.value;
      if (password.length > 0 && password !== confirmPassword) {
        alert("password did not match");
        return;
      }
    }
    
    loginorSigninToFirebase(email, password, isLoginPage, dispatch);
  };
  return (
    <Fragment>
      <div className={classes.center}>
        <h1>{isLoginPage ? "Login" : "Signup"}</h1>
        <form onSubmit={onSubmitDetailsHandler}>
          <div className={classes.text_field}>
            <input type="text" ref={emailRef} required />
            <span></span>
            <label>Email</label>
          </div>
          <div className={classes.text_field}>
            <input type="password" ref={passwordRef} required />
            <span></span>
            <label>Password</label>
          </div>

          {!isLoginPage && (
            <div className={classes.text_field}>
              <input type="password" ref={confirmPasswordRef} required />
              <span></span>
              <label>Confirm Password</label>
            </div>
          )}
          <input type="submit" value={isLoginPage ? "Login" : "Signup"} />
          {isLoginPage && (
            <div className={classes.forgot_pass}>Forgot Password?</div>
          )}
        </form>
        <div className={classes.displayNone}></div>

        <button className={classes.change_field} onClick={changePageHandler}>
          {isLoginPage ? "Not a member ? " : "Have an account? "}
          <span>{isLoginPage ? "signup" : "Login"}</span>
        </button>
      </div>
    </Fragment>
  );
};

export default LoginSignup;
