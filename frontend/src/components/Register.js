import { Container, Row, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Envelope, Person, Key, EyeSlash, Eye } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Axios.js";
import '../css/register.css';
import 'animate.css';
import BeeHappy from "../images/bee-happy.svg";
import BeeHoney from "../images/bee-honey.svg";
const REGISTER_URL = "api/auth/signup";

export const Register = () => {

    const {theme, setTheme} = useContext(ThemeContext);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [pswRepeat, setPswRepeat] = useState("");
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
 
    // Handle register form
    const handleSubmit = async (e) => {
    e.preventDefault();

    // Error handling
    if (psw !== pswRepeat) {
        toast.error("Your passwords do not match.", {
            position: "top-left",
            autoClose: 5000,
            theme: theme,
        });
        return;
    }
    if (psw.length < 6) {
        toast.error("Your password is too short.", {
            position: "top-left",
            autoClose: 5000,
            theme: theme,
        });
        return;
    }
    if (psw.length > 40) {
        toast.error("Your password is too long.", {
            position: "top-left",
            autoClose: 5000,
            theme: theme,
        });
        return;
    }
    if (user.length < 3) {
        toast.error("Your username too short.", {
            position: "top-left",
            autoClose: 5000,
            theme: theme,
        });
        return;
    }
    if (user.length > 20) {
        toast.error("Your username too long.", {
            position: "top-left",
            autoClose: 5000,
            theme: theme,
        });
        return;
    }

    // Send POST request if all inputs meet the requirements
    try {
        const response = await axios.post(
        REGISTER_URL,
        {
            username: user,
            email: email,
            password: psw,
            roles: ["user"]
        },
        {
            headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": true},
            withCredentials: true,
        }
        );

        // Clear state and controlled inputs
        setUser("");
        setEmail("");
        setPsw("");
        setPswRepeat("");

        // Successful POST request
        // Set success to true, so that we can redirect the user.
        setSuccess("true");
        toast.success("You have registered successfully! Welcome to BeeFit!",  {
            position: "top-left",
            autoClose: 5000,
            theme: theme,
            });
        
    // More error handling, can only check after POST request (POST request failed)
    } catch (err) {
        if (!err?.response) {
            toast.error("No server response. We are so sorry!", {
                position: "top-left",
                autoClose: 5000,
                theme: theme,
                });
        } else {
            toast.error("Error registering. Username or email already taken.", {
                position: "top-left",
                autoClose: 5000,
                theme: theme,
                });
        }
    }
    };

    if (success === "true") {
        return (
            <Navigate to="/login" />
        )
    }
    return ( 

        <section className="register" id={theme === 'light' ? 'register' : 'register-dark'}>
        <Container>
            <Row className="align-items-center">

            <Col xs={0} md={2} xl={3}>
                <div className="animate__animated animate__zoomIn">
                    <img className="bee" src={BeeHappy} alt="A happy bee"/>
                </div>
            </Col>

            <Col xs={12} md={8} xl={6}>
            <div className="animate__animated animate__fadeIn">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <h1>R<b>e</b>gist<b>e</b>r</h1>
                        <h2>Ready to bee the best you?</h2>

                        <div className="iconDiv">
                            <Person size={24} color="#5d5d5d" className="icon"/>
                            <input type="text" placeholder="Enter Username" name="user" value={user} onChange={(e) => setUser(e.target.value)} id="user" required></input>
                        </div>
                        <div className="iconDiv">
                            <Envelope size={20} color="#5d5d5d" className="icon"/>
                            <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" required></input><br></br>
                        </div>
                        <div className="iconDiv">
                            <Key size={24} color="#5d5d5d" className="icon"/>
                            {iconPassword}
                        <input type={passwordVisibility === 'true'? 'password' : 'text'} placeholder="Enter Password" value={psw} onChange={(e) => setPsw(e.target.value)} name="psw" id="psw" required></input><br></br>
                        </div>
                        <div className="iconDiv">
                            <Key size={24} color="#5d5d5d" className="icon"/>
                            {iconPassword}
                        <input type={passwordVisibility === 'true'? 'password' : 'text'} placeholder="Confirm Password" value={pswRepeat} onChange={(e) => setPswRepeat(e.target.value)} name="psw-repeat" id="psw-repeat" required></input>
                        </div>

                        <p>Your username must be 3-20 characters long. <br></br> Your password must be 6-40 characters long.</p>
                        <button type="submit" className="reg-button">Register</button>
                    </div>

                    <div className="sign-in">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
            </Col>

            <Col xs={0} md={2} xl={3}>
                <div className="animate__animated animate__zoomIn">
                    <img className="bee" src={BeeHoney} alt="Bee holding honey"/>
                </div>
            </Col>
            
            </Row>
        </Container>
        </section>
    )
}
