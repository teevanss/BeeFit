import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { MyContext } from '../MyContext';
import axios from "../Axios.js";
import '../css/register.css';
import 'animate.css';
import BeeHappy from "../images/bee-happy.svg";
import BeeHoney from "../images/bee-honey.svg";
const REGISTER_URL = "/register";

export const Register = () => {

    const {theme, setTheme} = useContext(MyContext);
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");

    //Handle register form
    const handleSubmit = async (err) => {
    err.preventDefault();
    const user = "aaakkkk"
    const usertype = "user"
    
    try {
        const response = await axios.post(
        REGISTER_URL,
        {
            username: "aaaaaaaaaaa",
            email: "teevans@buffalo.edu",
            password: "123456",
            roles: ["user"]
        },
        {

            headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": "http://localhost:3000"},
            withCredentials: false,
        }
        );
        //setSuccess(true);
        //Clear state and controlled inputs
        //setUser("");
        //setPwd("");
        //setMatchPwd("");
    } catch (err) {
        if (!err?.response) {
        //setErrMsg("No Server Response");
        } else {
        //setErrMsg("Registration Failed");
        }
        //errRef.current.focus();
    }
    };
    return ( 

        <section className="register" id={theme === 'light' ? 'register' : 'register-dark'}>
        <Container>
            <Row className="align-items-center">

            <Col xs={7} md={4} xl={3}>
                <div className="animate__animated animate__zoomIn">
                    <img className="bee" src={BeeHappy} alt="A happy bee"/>
                </div>
            </Col>

            {/* One full-width column, one 8/12 column, one half-width column */}
            <Col xs={14} md={8} xl={6}>
            <div className="animate__animated animate__fadeIn">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <h1>R<a>e</a>gist<a>e</a>r</h1>
                        <h2>Ready to bee the best you?</h2>

                        <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" required></input><br></br>
                        <input type="password" placeholder="Enter Password" value={psw} onChange={(e) => setPsw(e.target.value)} name="psw" id="psw" required></input><br></br>
                        <input type="password" placeholder="Confirm Password" name="psw-repeat" id="psw-repeat" required></input>

                        <p>Password must be 8-20 characters long, and have at least one lower and uppercase letter and a number.</p>
                        <button type="submit" className="registerbtn">Register</button>
                    </div>

                    <div className="sign-in">
                        Already have an account? <Link to="/login"><a>Sign in</a></Link>
                    </div>
                </form>
            </div>
            </Col>

            <Col xs={7} md={4} xl={3}>
                <div className="animate__animated animate__zoomIn">
                    <img className="bee" src={BeeHoney} alt="Bee holding honey"/>
                </div>
            </Col>
            
            </Row>
        </Container>
        </section>
    )
}
