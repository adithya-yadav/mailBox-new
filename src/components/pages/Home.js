import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useHistory } from "react-router-dom";
import { authActions } from "../store/Auth";
import { mailActions } from "../store/MailStore";
import MailMessage from "../Ui/MailMessage";
import Compose from "./Compose";
import classes from "./Home.module.css";
import Inbox from "./Inbox";
import Sent from "./Sent";

const Home = () => {
  const selectResiveIndex = useSelector((state) => state.mail.inboxIndex);
  const selectMailDetails = useSelector((state) => state.mail.mailDetails);
  const selectemail = localStorage.getItem('email')
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory();
  const composeHandler = () => {
    history.push("/Home/Compose");
  };
  const profileHandler = () => {};
  const mouseEnterProfileHandler = ()=>{
    setProfile(true)
  }
  const mouseLeaveProfileHandler = ()=>{
    setProfile(false)
  }
  const signoutHandler = ()=>{
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    dispatch(authActions.logout())
    dispatch(mailActions.onlogout())
  }
  return (
    <Fragment>
      <div className={classes.header}>
        <h2>S❕Mail</h2>
        <div className={classes.search}>
          <input
            type="text"
            placeholder="Find messages,documents,photos or people"
          />
          <button className={classes.search_icon}>🔍</button>
        </div>
        <button className={classes.profile_icon} onClick={profileHandler} onMouseEnter={mouseEnterProfileHandler} onMouseLeave={mouseLeaveProfileHandler}>
          👤
        </button>
      </div>
      <div className={classes.center}>
        <section>
          <button
            onClick={composeHandler}
            className={`${classes.compose} bg-primary text-white`}
          >
            Compose
          </button>
          <Link
            className={`${classes.link} d-flex justify-content-between`}
            to="/Home/Inbox"
          >
            <span>Inbox</span>
            {selectResiveIndex > 0 && (
              <div>
                <div className="d-flex flex-column align-items-center">
                  <span>{selectResiveIndex}</span>
                  <small className="d-block position-absolute mt-4">
                    unread
                  </small>
                </div>
              </div>
            )}
          </Link>
          <Link className={classes.link} to="/Home">
            Starred
          </Link>
          <Link className={classes.link} to="/Home">
            Drafts
          </Link>
          <Link className={classes.link} to="/Home/Sent">
            Sent
          </Link>
          <Link className={classes.link} to="/Home">
            Archive
          </Link>
          <Link className={classes.link} to="/Home">
            Spam
          </Link>
          <Link className={classes.link} to="/Home">
            Deleted Items
          </Link>

          <Link className={classes.link} to="/Home">
            Views Hide
          </Link>
          <Link className={classes.link} to="/Home">
            Linkhotos
          </Link>
          <Link className={classes.link} to="/Home">
            Document
          </Link>
          <Link className={classes.link} to="/Home">
            SubscriLinktions
          </Link>
          <Link className={classes.link} to="/Home">
            Deals
          </Link>
          <Link className={classes.link} to="/Home">
            Travel
          </Link>

          <Link className={classes.link} to="/Home">
            Folders Hide
          </Link>
          <Link className={classes.link} to="/Home">
            Folder1
          </Link>

          <Link className={classes.link} to="/Home">
            + New folder
          </Link>
        </section>
        <div className={classes.view_field}>
          <Route path="/Home/Compose">
            <Compose />
          </Route>
          <Route path="/Home/Inbox">
            <Inbox />
          </Route>
          <Route path="/Home/Sent" exact>
            <Sent />
          </Route>
          {selectMailDetails && (
            <Route path="/Home/Sent/mail">
              <MailMessage />
            </Route>
          )}
        </div>
      </div>
      {profile && (
        <div className={classes.profile_field} onMouseEnter={mouseEnterProfileHandler} onMouseLeave={mouseLeaveProfileHandler}>
          <div className={classes.profile_email}><div className="me-2">👤</div><span>{selectemail}</span></div>
          <div className={classes.profile_account}>+ Add or Manage Account</div>
          <div className={classes.profile_signout}><button onClick={signoutHandler}>Sign out</button></div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
