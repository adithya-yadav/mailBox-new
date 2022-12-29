import { authActions } from "../store/Auth";
import { mailActions } from "../store/MailStore";

const url = "https://adddetails-2dc5d-default-rtdb.firebaseio.com/";
const webApiKey = "AIzaSyDOrZEaIdE5JVsMsQmrJRijh7X9HpgCeHE";


export const sentMailToFirebase = async (mail, dispatch) => {
  try {
    const response = await fetch(`${url}mails.json`, {
      method: "POST",
      body: JSON.stringify(mail),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      dispatch(mailActions.sendMail(mail));
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

export async function loginorSigninToFirebase(
  email,
  password,
  isLoginPage,
  dispatch
) {
  let Authurl;
  if (isLoginPage) {
    Authurl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webApiKey}`;
  } else {
    Authurl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webApiKey}`;
  }
  try {
    const response = await fetch(Authurl, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      if (isLoginPage) {
        localStorage.setItem("token", data.idToken);
        dispatch(authActions.login());
      } else{
        try {
            const response = await fetch(`${url}emailTokenId.json`, {
              method: "POST",
              body: JSON.stringify(data.idToken),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const idData = await response.json();
            if (!response.ok) {
              throw new Error(idData.error.message);
            }
          } catch (error) {
            alert(error.message);
          }
        alert(`successfully signedup ${data.email}`);
      } 
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    alert(error.message);
  }
}
