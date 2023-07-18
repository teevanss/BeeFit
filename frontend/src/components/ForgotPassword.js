import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { MyContext } from '../MyContext';
import { Envelope } from 'react-bootstrap-icons';
import '../css/forgotpassword.css';
import 'animate.css';
import BeeHappy from "../images/bee-happy.svg";
import BeeHoney from "../images/bee-honey.svg";

export const ForgotPassword = () => {

    const {theme, setTheme} = useContext(MyContext);

    return ( 

        <section className="forgotpassword" id={theme === 'light' ? 'forgotpassword' : 'forgotpassword-dark'}>
        <Container>
            <Row className="align-items-center">

            <Col xs={7} md={4} xl={3}>
                <div className="animate__animated animate__zoomIn">
                    <img className="bee" src={BeeHappy} alt="A happy bee"/>
                </div>
            </Col>

            <Col xs={14} md={8} xl={6}>
            <div className="animate__animated animate__fadeIn">
                <form action="action_page.php">
                    <div className="container">
                        <h1>Reset Pass<a>word</a></h1>
                        <h2>Please enter the email associated with your account.</h2>

                        <div className="iconDiv">
                            <Envelope size={20} color="#5d5d5d" className="icon2"/>
                            <input type="text" placeholder="Enter Email" name="email" id="email" required></input><br></br>
                        </div>

                        <button type="submit" className="submitbtn">Submit</button>
                    </div>

                    <div className="sign-in">
                        Don't have an account? <Link to="/register"><a>Register</a></Link>
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
