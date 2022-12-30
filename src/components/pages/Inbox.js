import { Fragment } from "react";
import { useSelector } from "react-redux";
import Message from "../Ui/Message";
import NoMessage from "../Ui/NoMessage";
import classes from "./Inbox.module.css";

const Inbox = () => {
  const selectInbox = useSelector((state) => state.mail.inBox);
  let messages;
  if(selectInbox){ messages = selectInbox.map((message,ind) => {
      return (
        <Message
          key={ind}
          path="/Home/Inbox"
          id={message.id}
          mailid={message.mailResiverId}
          mailSenderId={message.mailSenderId}
          resiveId={message.mailResiverId}
          textMail={message.textMail}
          editorText={message.editorText}
          date={message.date}
        />
      );
    });}
    return (
      <Fragment>
        <div className={classes.view_header}>
          <p>Archive</p>
          <p>Move</p>
          <p>Delete</p>
          <p>Spam</p>
        </div>
        <div className={classes.messages}>{messages}</div>
        {!selectInbox && <NoMessage />}
      </Fragment>
    );
};

export default Inbox;
