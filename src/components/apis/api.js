import { authActions } from "../store/Auth";
import { mailActions } from "../store/MailStore";

const url = "https://adddetails-2dc5d-default-rtdb.firebaseio.com/";
const webApiKey = "AIzaSyDOrZEaIdE5JVsMsQmrJRijh7X9HpgCeHE";

let senderEmail = localStorage.getItem("email");

if (senderEmail) {
  senderEmail = localStorage
    .getItem("email")
    .replace(".", "")
    .replace(".", "")
    .replace("@", "");
}

export const sentMailToFirebase = async (mail, dispatch) => {
  let sendid;
  try {
    const response = await fetch(`${url}${senderEmail}/sent.json`, {
      method: "POST",
      body: JSON.stringify(mail),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      sendid = data.name;
      mail["id"] = sendid;
      dispatch(mailActions.sendMail(mail));
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
  const resiverMail = mail.mailResiverId
    .replace(".", "")
    .replace(".", "")
    .replace("@", "");

  try {
    const response = await fetch(`${url}${resiverMail}/resive/${sendid}.json`, {
      method: "POST",
      body: JSON.stringify(mail),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
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
        localStorage.setItem("email", data.email);
        dispatch(authActions.login());
      } else {
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

export const getDataFromFirebase = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${url}${senderEmail}.json`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      return data;
    };
    try {
      const fetchdata = await fetchData();
      dispatch(mailActions.rePlace(fetchdata));
    } catch (error) {
      //   alert(error.message)
      console.log(error.message);
    }
  };
};

export const readMailinfirebase = async(id,dispatch)=>{
  try{
    const response = await fetch(`${url}${senderEmail}/resive/${id}.json`)
    const data =await response.json()
    if(response.ok){
      const key = Object.keys(data)[0]
      const value = Object.values(data)[0]
      value["readMail"]=true
      const response = await fetch(`${url}${senderEmail}/resive/${id}/${key}.json`,{
        method:'PUT',
        body:JSON.stringify(value),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const newdata = await response.json()
      if(response.ok){
        dispatch(mailActions.mailread(newdata.id))
      }else{
        throw new Error(newdata.error.message)
      }
    }else{
      throw new Error(data.error.message)
    }
  }catch(error){
    alert(error.message)
  }
}

export const deleteMailInFirebase = async(id,path,dispatch)=>{
  let mailpath;
  if(path==="/Home/Inbox"){
    mailpath="resive"
  }else{
    mailpath="sent"
  }
  try{
    const response =await fetch(`${url}${senderEmail}/${mailpath}/${id}.json`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json()
    if(response.ok){
      dispatch(mailActions.deleteMail({id:id,path:path}))
    }else{
      throw new Error(data.error.message)
    }
  }catch(error){
    alert(error.message)
  }
}

export const resiveMailsformFirebase = async(dispatch)=>{
  try{
    const response = await fetch(`${url}${senderEmail}/resive.json`)
    const data = await response.json()
    if(response.ok){
      dispatch(mailActions.rePlace({resivemailsInevery2Secound:data}))
    }else{
      throw new Error(data.error.message)
    }
  }catch(error){
    console.log(error.message)
  }
}