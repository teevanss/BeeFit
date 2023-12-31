import { Container, Row, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { LoginContext } from '../LoginContext';
import { Person, Key, Eye, EyeSlash } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Axios.js";
import '../css/login.css';
import 'animate.css';
import BeeStick from "../images/bee-stick.svg";
const LOGIN_URL = "/api/auth/signin";

export const Login = () => {

    const {theme, setTheme} = useContext(ThemeContext);
    const {loggedIn, setLoggedIn} = useContext(LoginContext);
    const [user, setUser] = useState("");
    const [psw, setPsw] = useState("");
    const [success, setSuccess] = useState("false");
    const [passwordVisibility, setPasswordVisibility] = useState("true");

    // Change password visibility
    let iconPassword;
    if (passwordVisibility === "true") {
        iconPassword = <EyeSlash size={24} color="#5d5d5d" className="eye" onClick= {() => {setPasswordVisibility("false");}}/>
    }
    else {
        iconPassword = <Eye size={24} color="#5d5d5d" className="eye" onClick= {() => {setPasswordVisibility("true");}}/>
    }

    // Handle login form
    const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request
    try {
        const response = await axios.post(
        LOGIN_URL,
        {
            username: user,
            password: psw,
        },
        {
            headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": true},
            withCredentials: true,
        }
        )

        // Store user
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoggedIn(true);

        // Clear state and controlled inputs
        setUser("");
        setPsw("");

        // Successful POST request
        // Set success to true, so that we can redirect the user.
        setSuccess("true");
        toast.success("You have logged in successfully! We are so happy to see you!",  {
            position: "top-left",
            autoClose: 5000,
            theme: theme,
            });
        
    // Error handling, can only check after POST request (POST request failed)
    } catch (err) {
        if (!err?.response) {
            toast.error("No server response. We are so sorry!", {
                position: "top-left",
                autoClose: 5000,
                theme: theme,
                });
        } else {
            toast.error("Error logging in. Invalid username or password.", {
                position: "top-left",
                autoClose: 5000,
                theme: theme,
                });
        }
    }
    };

    if (success === "true") {

        const id =  JSON.parse(localStorage.getItem("user"));
        
        let [key, value] = Object.entries(id)[1];
        let userId = value;

        return (
            <Navigate to={`/home/${userId}`} />
        )
    }
    return ( 

        <section className="login" id={theme === 'light' ? 'login' : 'login-dark'}>
        <Container>
            <Row className="align-items-center">

            <Col xs={12} md={4} xl={6}>
                <div className="animate__animated animate__zoomIn">
                    <img className="bee" src={BeeStick} alt="Bee holding honey stick"/>
                </div>
            </Col>

            <Col xs={0} md={8} xl={6}>
            <div className="animate__animated animate__fadeIn">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        
                        <h1>Log<b>in</b></h1>
                        <h2>Bee-lieve in yourself!</h2>

                        <div className="iconDiv">
                            <Person size={24} color="#5d5d5d" className="icon"/>
                            <input type="text" placeholder="Enter Username" name="uname" value={user} onChange={(e) => setUser(e.target.value)} id="user" required className="text"></input>
                        </div>

                        <div className="forgot">
                            <Link to="/forgotpassword">Forgot username?</Link>
                        </div>

                        <div className="iconDiv">
                            <Key size={24} color="#5d5d5d" className="icon"/>
                            {iconPassword}
                            <input type={passwordVisibility === 'true'? 'password' : 'text'} placeholder="Enter Password" value={psw} onChange={(e) => setPsw(e.target.value)} name="psw" id="psw" required className="text"></input>
                        </div>

                        <div className="forgot">
                            <Link to="/forgotpassword">Forgot password?</Link>
                        </div>

                        <button type="submit">Login</button>

                    </div>
                </form>
            </div>
            </Col>
            
            </Row>
        </Container>  
        </section>
    )
}