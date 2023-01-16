import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Security from "./Security";
import Signup from "./app/Signup";
import Login from "./app/Login";
import Chats from "./app/Chats";
import "./static/main.css";
import { Route, Routes } from "react-router-dom";


// import { useContext } from "react";
const App = () => {
    return ( 
        <>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/security" element={<Security />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chats" element={<Chats />} />
            </Routes>
        </> 
     );
}
 
export default App;