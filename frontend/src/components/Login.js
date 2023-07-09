import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import '../css/login.css';
import 'animate.css';
import Daisy from "../images/daisy.png";
import Daisy2 from "../images/daisy2.png";
import Daisy3 from "../images/daisy3.png";
import BeeStick from "../images/bee-stick.svg";

export const Login = () => {

    return ( 

        <section className="login" id="login">
        <Container>
            <Row className="align-items-center">

            <Col xs={14} md={8} xl={6}>
                <div className="animate__animated animate__zoomIn">
                <img className="bee" src={BeeStick} alt="Bee holding honey stick"/>
                </div>
            </Col>

            {/* One full-width column, one 8/12 column, one half-width column */}
            <Col xs={14} md={8} xl={6}>
            <div className="animate__animated animate__fadeIn">
                <form action="action_page.php" method="post">
                    <div class="container">
                        
                        <h1>Log<a>in</a></h1>
                        <h2>Bee-lieve in yourself!</h2>

                        <input type="text" placeholder="Enter Username" name="uname" required className="text"></input>
                        <input type="password" placeholder="Enter Password" name="psw" required className="text"></input>

                        <span>
                            <div className="checkbox">
                                <input type="checkbox" checked="checked" name="remember"></input>
                                <label for="remember">Remember me</label>
                            </div>
                            <Link to="/forgotpassword"><p><a href="#">Forgot password?</a></p></Link>
                        </span>

                        <button type="submit">Login</button>

                    </div>
                </form>
            </div>
            </Col>
            </Row>
        </Container>

        <div className="daisy">
            <img src={Daisy} alt="Daisy"/>
        </div>
        <div className="daisy2">
            <img src={Daisy2} alt="Daisy"/>
        </div>
        <div className="daisy3">
            <img src={Daisy3} alt="Daisy"/>
        </div>
        
        </section>
    )
}