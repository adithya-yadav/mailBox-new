import { EditorState } from "draft-js";
import { Fragment, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { sentMailToFirebase } from "../apis/api";
import classes from "./Home.module.css";

const Home = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const textMailRef = useRef();
  const mailIdRef = useRef()
  const dispatch = useDispatch()

  const sendMailHandler = () => {
    const mailSenderId = localStorage.getItem("email")
    const mailResiverId = mailIdRef.current.value;
    const textMail = textMailRef.current.value;
    const editorText = editorState.getCurrentContent().getPlainText();
    const mail = {
        mailSenderId,
        mailResiverId,
        textMail,
        editorText
    }
    sentMailToFirebase(mail,dispatch)
  };
  const deleteMailHandler = ()=>{
    mailIdRef.current.value = ""
    textMailRef.current.value = ""
    setEditorState("")
  }
  return (
    <Fragment>
      <div className={classes.center}>
        <div className="d-flex">
          <span className="mt-3 text-muted ">To</span>
          <input ref={mailIdRef} type="text" className="w-100" />
        </div>
        <input ref={textMailRef} type="text" placeholder="Text mail" />
        <Editor
          editorClassName={classes.editor}
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
        <div className={classes.footer_field}>
          <button className="btn btn-primary px-5" onClick={sendMailHandler}>
            Send
          </button>
          <button className="border-0 bg-white me-3" onClick={deleteMailHandler}>🗑</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
