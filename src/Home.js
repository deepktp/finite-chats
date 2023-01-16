import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookie= new Cookies();
var uid;

const Home = () => {
    return ( 
        <>
            {(uid)?
                (<>
                    <p>Hello, WelCome Back;</p>
                </>):( 
                    <>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/signup">
                        <button>Signup</button>
                    </Link>
                </>
                )}
        </>
     );
}
 
export default Home;