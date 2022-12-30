import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { deleteMailInFirebase, readMailinfirebase } from "../apis/api";
import { mailActions } from "../store/MailStore";
import MailMessage from "./MailMessage";
import classes from "./Message.module.css";

const Message = (props) => {
  const {path} = props
  const dispatch = useDispatch();
  const history = useHistory();
  const { mailid, textMail, editorText, date ,id} = props;
  const [onHover,setOnHover] = useState(false)
  const boxmail = useSelector(state=>state.mail.inBox)
  let readMail;
  let findmailInd 
  if(path !== "/Home/Sent"){
    findmailInd= boxmail.findIndex(mail=>mail.id === id)
    readMail = boxmail[findmailInd].readMail
  }
  const showMailinDetailHandler = () => {
    if(path === "/Home/Inbox"){
      if(!readMail){
        readMailinfirebase(id,dispatch)
      }
    }
    history.push("/Home/Sent/mail");
    dispatch(mailActions.mailInDetail({mailid:mailid,textMail:textMail, editorText:editorText, date:date }));
  };
  const onHoverHandler = ()=>{
    setOnHover(true)
  }
  const removeHoverHandler = ()=>{
    setOnHover(false)
  }
  const deleteMailHandler =()=>{
    deleteMailInFirebase(id,path,dispatch)
    // dispatch(mailActions.deleteMail({id:id,path:path}))
  }
  return (
    <Fragment>
      <Route path={path} exact>
        <div className={classes.message} onMouseEnter={onHoverHandler} onMouseLeave={removeHoverHandler}>
          <input type="checkbox" />
          <span
           className={path==="/Home/Sent" ? `${classes.dot} bg-light` : readMail ? `${classes.dot} bg-light` :`${classes.dot}`}
          ></span>
          <button onClick={showMailinDetailHandler} className={classes.id}>
            {mailid}
          </button>
          <p className={classes.text}>
            <span className={classes.star}>☆</span>
            {textMail}
          </p>
          <p className={classes.editor}>{editorText}</p>
          {!onHover && <p className="text-secondary">{date}</p>}
          {onHover && <button className="btn btn-outline-danger" onClick={deleteMailHandler}>X</button>}
        </div>
      </Route>
      <Route path="/Home/Sent/mail">
        <MailMessage
          mailid={mailid}
          textMail={textMail}
          editorText={editorText}
          date={date}
        />
      </Route>
    </Fragment>
  );
};

export default Message;
