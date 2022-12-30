import { Fragment } from "react";
import { useSelector } from "react-redux";
import Message from "../Ui/Message";
import NoMessage from "../Ui/NoMessage";
import classes from "./Inbox.module.css";

const Sent = () => {
  const selectSent = useSelector((state) => state.mail.sent);
  const messages = selectSent.map((message, ind) => {
  
    return (
      <Message
        key={ind}
        path="/Home/Sent"
        mailid={message.mailResiverId}
        mailSenderId={message.mailSenderId}
        resiveId={message.mailResiverId}
        textMail={message.textMail}
        editorText={message.editorText}
        date={message.date}
      />
    );
  });
  return (
    <Fragment>
      <div className={classes.view_header}>
        <p>Archive</p>
        <p>Move</p>
        <p>Delete</p>
        <p>Spam</p>
      </div>
      <div className={classes.messages}>{messages}</div>
      {!selectSent.length && <NoMessage />}
    </Fragment>
  );
};

export default Sent;
