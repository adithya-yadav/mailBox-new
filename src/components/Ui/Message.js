import { Fragment } from "react";
import classes from "./Message.module.css"

const Message = (props) => {
  return (
    <Fragment>
      <div className={classes.message}>
        <p className={classes.id}>{props.mailSenderId}</p>
        <p className={classes.text}>{props.textMail}</p>
        <p className={classes.editor}>{props.editorText}</p>
      </div>
    </Fragment>
  );
};

export default Message;
