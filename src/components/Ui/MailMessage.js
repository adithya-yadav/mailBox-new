import { EditorState } from "draft-js";
import { Fragment, useState } from "react";
import classes from "./MailMessage.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from "react-redux";

const MailMessage = (props) => {
  const selectMailDetails = useSelector((state) => state.mail.mailDetails);
  const { mailid, textMail, editorText, date } = selectMailDetails;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const sendMailHandler = () => {};
  const deleteMailHandler = () => {};
  return (
    <>
      <Fragment>
        <div className={classes.view_header}>
          <p>Archive</p>
          <p>Move</p>
          <p>Delete</p>
          <p>Spam</p>
        </div>
        <div className={classes.mail_text}>
          <div className={classes.dot} />
          <h6>{textMail}</h6>
        </div>
        <div className={classes.mail}>
          <div className={classes.mail_id}>
            <div className={classes.dot} />
            <h5>{mailid}</h5>
          </div>
          <div className={classes.mail_message}>{editorText}</div>
        </div>
        <div className={classes.center}>
          <Editor
            editorClassName={classes.editor}
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
          <div className={classes.footer_field}>
            <button className="btn btn-primary px-5" onClick={sendMailHandler}>
              Send
            </button>
            <button
              className="border-0 bg-white me-3"
              onClick={deleteMailHandler}
            >
              🗑
            </button>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default MailMessage;
