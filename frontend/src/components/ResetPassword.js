import { Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Lock, Eye, EyeSlash, Key } from 'react-bootstrap-icons';
import '../css/resetpassword.css';
import 'animate.css';
import BeeHappy from "../images/bee-happy.svg";
import BeeHoney from "../images/bee-honey.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Axios.js";
const RESETPASS_URL = "/api/resetpw";

export const ResetPassword = () => {

    const {theme, setTheme} = useContext(ThemeContext);
    const [user, setUser] = useState("");
    const [code, setCode] = useState("");
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

    // Handle reset password form
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

        // Send POST request if all inputs meet the requirements
        try {
            const response = await axios.post(
            RESETPASS_URL,
            {
                token: code,
                password: psw,
                user: "f4iiinst4rz",
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
            setCode("");
            setUser("");
            setPsw("");
            setPswRepeat("");
    
            // Successful POST request
            // Set success to true, so that we can redirect the user.
            setSuccess("true");
            toast.success("Password reset successfully!",  {
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
                toast.error("Invalid code. Please re-check your email.", {
                    position: "top-left",
                    autoClose: 5000,
                    theme: theme,
                    });
            }
        }
        };
    
    if (success === "true") {

        return (
            <Navigate to="/login"/>
        )
    }
    return ( 

        <section className="resetpassword" id={theme === 'light' ? 'resetpassword' : 'resetpassword-dark'}>
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
                        <h1>Reset Pass<b>word</b></h1>
                        <h2>Please enter the code you received from us in your email.</h2>

                        <div className="iconDiv">
                            <Lock size={22} color="#5d5d5d" className="icon"/>
                            <input type="text" placeholder="Enter Code" name="code" id="code" value={code} onChange={(e) => setCode(e.target.value)} required></input>
                        </div>
                        <div className="iconDiv">
                            <Key size={24} color="#5d5d5d" className="icon"/>
                            {iconPassword}
                        <input type={passwordVisibility === 'true'? 'password' : 'text'} placeholder="Enter New Password" value={psw} onChange={(e) => setPsw(e.target.value)} name="psw" id="psw" required></input>
                        </div>
                        <div className="iconDiv">
                            <Key size={24} color="#5d5d5d" className="icon"/>
                            {iconPassword}
                        <input type={passwordVisibility === 'true'? 'password' : 'text'} placeholder="Confirm New Password" value={pswRepeat} onChange={(e) => setPswRepeat(e.target.value)} name="psw-repeat" id="psw-repeat" required></input>
                        </div>

                        <p>Your password must be 6-40 characters long.</p>
                        <button type="submit" className="reset-button">Submit</button>
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