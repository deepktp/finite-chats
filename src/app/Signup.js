import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import app from "../context/conn";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, updateProfile} from "firebase/auth";
import { userContext } from "../context/user";
import { getFirestore, serverTimestamp ,doc, setDoc } from "firebase/firestore";


const Cookie= new Cookies();

const countryCode= "+91";


var confirmationResult;
const Signup = () => {

    const auth= getAuth(useContext(app));
    const firestore= getFirestore(useContext(app));
    const [mobile, setMobile] = useState();
    const [OTP, setOTP] = useState();
    const [name, setName] = useState();
    const [authType, setAuthType] = useState("mobile");
    const navigate = useNavigate();
    function authMobile() {
        const appVerifier= new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            'expired-callback': () => {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
          }, auth);
          console.log(mobile)
        signInWithPhoneNumber(auth, countryCode+mobile, appVerifier).then((confirmationResults) => {
            confirmationResult = confirmationResults;
            setAuthType("otp");
        }).catch((error) => {
            console.log(error);
            
        })
    }

    function authOTP(){
        confirmationResult.confirm(OTP).then((result) => {
            // User signed in successfully.
            const user = result.user;
            userContext(user);
            Cookie.set("uid", user.uid);
            setAuthType("name")

        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.log(error);
            
        })
    }

    function authName(){

        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            setDoc(doc(firestore, "users", auth.currentUser.uid), {
                uid: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                phoneNumber: auth.currentUser.phoneNumber,
                joinedAt: serverTimestamp(),
                groups: []
            }, {merge: true}).then(() => {
                navigate("/chats");
            }).catch((error) => {
                console.log(error, "Error in setting user data");
            });
        }).catch((error) => {
            console.log(error, "Error in updating user profile");
            
        })
    }
    
    return ( 
        <>
            <section className="signup">
                <div className="signup-form">
                        <img src="/img/favicon.png" alt="Finite Chats Logo" />
                        <h2>Login/Signup</h2>
                        <div style={authType==="mobile"?{display:"block"}:{display:"none"}}>
                            
                            <label htmlFor="mobile">Mobile Number: </label>
                            <div className="input-container">
                                <input type="text" className="country-code" value={countryCode} readOnly />
                                <input type="number" className="number" onChange={(e)=>{setMobile(e.target.value)}} required/>
                            </div>
                            <div id="recaptcha-container"></div>
                            <button onClick={authMobile} className="submit" id="auth-mobile-button">Submit</button>
                        </div>
                        <div style={authType==="otp"?{display:"block"}:{display:"none"}}>
                            <label htmlFor="mobile">Enter OTP: </label>
                            <div className="input-container">
                                <input type="number" onChange={(e)=>{setOTP(e.target.value)}} required/>
                            </div>
                            <button onClick={authOTP} className="submit">Submit</button>
                        </div>
                        <div style={authType==="name"?{display:"block"}:{display:"none"}}>
                            <label htmlFor="mobile">Your Name Please: </label>
                            <div className="input-container">
                                <input type="text" onChange={(e)=>{setName(e.target.value)}} required/>
                            </div>
                            <button onClick={authName} className="submit">Submit</button>
                        </div>
                </div>
            </section>
        </>
     );
}
 
export default Signup;