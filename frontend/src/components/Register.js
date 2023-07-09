import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import { useContext } from 'react';
import { MyContext } from '../MyContext';
import '../css/register.css';
import 'animate.css';
import BeeHappy from "../images/bee-happy.svg";
import BeeHoney from "../images/bee-honey.svg";
import Daisy from "../images/daisy.png";
import Daisy2 from "../images/daisy2.png";
import Daisy3 from "../images/daisy3.png";

export const Register = () => {

    const {activeLink, setActiveLink} = useContext(MyContext);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
      }

    return ( 

        <section className="register" id="register">
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
                <form action="action_page.php">
                    <div class="container">
                        <h1>R<a>e</a>gist<a>e</a>r</h1>
                        <h2>Ready to bee the best you?</h2>

                        <input type="text" placeholder="Enter Email" name="email" id="email" required></input><br></br>
                        <input type="password" placeholder="Enter Password" name="psw" id="psw" required></input><br></br>
                        <input type="password" placeholder="Confirm Password" name="psw-repeat" id="psw-repeat" required></input>

                        <p>Password must be 8-20 characters long, and have at least one lower and uppercase letter and a number.</p>
                        <button type="submit" class="registerbtn">Register</button>
                    </div>

                    <div className="sign-in">
                        Already have an account? <Link to="/login"><a onClick={() => onUpdateActiveLink('login')}>Sign in</a></Link>
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

        <img src={Daisy} className="daisy" alt="Daisy"/>
        <img src={Daisy2} className="daisy2" alt="Daisy"/>
        <img src={Daisy3} className="daisy3" alt="Daisy"/>

        </section>
    )
}
