import { Fragment } from "react";
import { useSelector } from "react-redux";
import Message from "../Ui/Message";
import classes from "./Home.module.css";

const Home = () => {
  const selectInbox = useSelector((state) => state.mail.inBox);
  const messages = selectInbox.map((message) => {
    return (
      <Message
        key={message.id}
        mailSenderId={message.mailSenderId}
        resiveId={message.resiveId}
        textMail={message.textMail}
        editorText={message.editorText}
      />
    );
  });
  return (
    <Fragment>
      <div className={classes.header}>
        <h2>S❗Mail</h2>
        <input
          type="text"
          placeholder="Find messages,documents,photos or people"
        />
        <button>🔍</button>
      </div>
      <div className={classes.center}>
        <section>
          <button className="bg-primary text-white">Compose</button>
          <p>Inbox</p>
          <p>Starred</p>
          <p>Drafts</p>
          <p>Sent</p>
          <p>Archive</p>
          <p>Spam</p>
          <p>Deleted Items</p>

          <p>Views Hide</p>
          <p>Photos</p>
          <p>Document</p>
          <p>Subscriptions</p>
          <p>Deals</p>
          <p>Travel</p>

          <p>Folders Hide</p>
          <p>Folder1</p>

          <p>+ New folder</p>
        </section>
        <div className={classes.view_field}>
          <div className={classes.view_header}>
            <p>Archive</p>
            <p>Move</p>
            <p>Delete</p>
            <p>Spam</p>
          </div>
          <div className={classes.messages}>{messages}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
