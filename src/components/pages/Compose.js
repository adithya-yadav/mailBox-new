import { EditorState } from "draft-js";
import { Fragment, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { sentMailToFirebase } from "../apis/api";
import classes from "./Compose.module.css";

const Compose = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const textMailRef = useRef();
  const mailIdRef = useRef();
  const dispatch = useDispatch();

  const sendMailHandler = () => {
    const mailSenderId = localStorage.getItem("email");
    const mailResiverId = mailIdRef.current.value;
    const textMail = textMailRef.current.value;
    if (!mailResiverId.includes("@")) {
      alert("enter Valid email");
      return;
    }
    const editorText = editorState.getCurrentContent().getPlainText();
    const today = new Date();
    const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    const mail = {
      mailSenderId,
      mailResiverId,
      textMail,
      editorText,
      date,
      readMail:false
    };
    sentMailToFirebase(mail, dispatch);
    mailIdRef.current.value = "";
    textMailRef.current.value = "";
    setEditorState("");
  };
  const deleteMailHandler = () => {
    mailIdRef.current.value = "";
    textMailRef.current.value = "";
    setEditorState("");
  };
  return (
    <Fragment>
      <div className={classes.center}>
        <div className="d-flex">
          <span className="mt-3 text-muted ">To</span>
          <input ref={mailIdRef} type="email" className="w-100" required />
        </div>
        <input ref={textMailRef} type="text" placeholder="Subject" required />
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
  );
};

export default Compose;
