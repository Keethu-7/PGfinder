import React from "react";
import './login.css'
import google from '../../images/google.png'
import login from '../../images/login.jpg'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../../firebase';
import { useNavigate } from "react-router-dom";



export default function Login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  
  const navigate = useNavigate();
 

  async function handleSignIn(){

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user.displayName)
    navigate("/dashboard")
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }
  return (
    <div className="login">
      <div className="login-cont">
        <div className="login-head">
          <h1>Welcome To PGfinder </h1>
          <p>
            Find Your Comfort Away from Home with Ease!<br></br><br></br>The Ultimate
            Time-saving App for<br></br> Discovering Your Perfect PG Haven!
          </p>
        </div>
        <div className="login-button">
          <button

          onClick={handleSignIn}
           className="login-btn">
            <img alt="" src={google}></img>
            <p> Sign in with Google</p>
          </button>
        </div>
      </div>
      <div className="right-image">
        <img src={login} alt=""></img>
      </div>
    </div>
  );
}
