import { Container, Row, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Envelope } from 'react-bootstrap-icons';
import '../css/forgotpassword.css';
import 'animate.css';
import BeeHappy from "../images/bee-happy.svg";
import BeeHoney from "../images/bee-honey.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Axios.js";
const FORGOTPASS_URL = "/api/forgotpw";

export const ForgotUsername = () => {

    const {theme, setTheme} = useContext(ThemeContext);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("false");

    // Handle forgot password form
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Send POST request
        try {
            const response = await axios.post(
            FORGOTPASS_URL,
            {
                email: email,
            },
            {
                headers: { 
                    "Content-Type": "application/json", 
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": true},
                withCredentials: true,
            }
            )
    
            // Clear state and controlled inputs
            setEmail("");
    
            // Successful POST request
            // Set success to true, so that we can redirect the user.
            setSuccess("true");
            toast.success("We have sent a reset code to that email.",  {
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
                toast.error("That email does not exist.", {
                    position: "top-left",
                    autoClose: 5000,
                    theme: theme,
                    });
            }
        }
        };
    
    if (success === "true") {

        return (
            <Navigate to="/resetpassword"/>
        )
    }
    return ( 

        <section className="forgotpassword" id={theme === 'light' ? 'forgotpassword' : 'forgotpassword-dark'}>
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
                        <h1>Forgot User<b>name</b></h1>
                        <h2>Please enter the email associated with your account.</h2>

                        <div className="iconDiv">
                            <Envelope size={20} color="#5d5d5d" className="icon2"/>
                            <input type="text" placeholder="Enter Email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input><br></br>
                        </div>

                        <button type="submit" className="submitbtn">Submit</button>
                    </div>

                    <div className="sign-in">
                        Don't have an account? <Link to="/register">Register</Link>
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
