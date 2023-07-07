import { Container, Row, Col } from "react-bootstrap";
import '../css/login.css';
import 'animate.css';
import Daisy from "../images/daisy.png";
import Daisy2 from "../images/daisy2.png";
import Daisy3 from "../images/daisy3.png";
import BeeHappy from "../images/bee-happy.svg";

export const Login = () => {

    return ( 

        <section className="login" id="login">
        <Container>
            <Row className="align-items-center">

            <Col xs={14} md={8} xl={6}>
                <div className="animate__animated animate__zoomIn">
                <img className="bee" src={BeeHappy} alt="A happy bee"/>
                </div>
            </Col>

            {/* One full-width column, one 8/12 column, one half-width column */}
            <Col xs={14} md={8} xl={6}>
            <div className="animate__animated animate__fadeIn">
                <form action="action_page.php" method="post">
                    <div class="container">
                        
                        <h1>Log<a>in</a></h1>
                        <h2>Bee-lieve in yourself!</h2>

                        <input type="text" placeholder="Enter Username" name="uname" required></input>
                        <input type="password" placeholder="Enter Password" name="psw" required></input>

                        <button type="submit">Login</button>
                        {/*<label>
                        <input type="checkbox" checked="checked" name="remember">Remember me</input>
                        </label>*/}
                    </div>

                    <div class="container">
                        <p>Forgot <a href="#">password?</a></p>
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