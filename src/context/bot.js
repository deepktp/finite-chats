import { getAuth, RecaptchaVerifier } from "firebase/auth";
import app from "../context/conn";
const auth= getAuth(app);

  window.captcha=  new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);


  