import { Container, Row, Col } from "react-bootstrap";
import '../css/register.css';
import Daisy from "../images/daisy.png";
import Daisy2 from "../images/daisy2.png";
import Daisy3 from "../images/daisy3.png";

export const Register = () => {

    return ( 

        <section className="register" id="register">
        <Container>
            <Row className="align-items-center">

            {/* One full-width column, one 8/12 column, one half-width column */}
            <Col xs={14} md={8} xl={6}>

            <form action="action_page.php">
            <div class="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>

                
                <label for="email"><b>Email</b></label><br></br>
                <input type="text" placeholder="Enter Email" name="email" id="email" required></input><br></br>
                <label for="psw"><b>Password</b></label><br></br>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required></input><br></br>
                <label for="psw-repeat"><b>Repeat Password</b></label><br></br>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required></input>


                <p>Password must be 8-20 characters long, and have at least one lower and uppercase letter and a number.</p>
                <button type="submit" class="registerbtn">Register</button>
            </div>

            <div class="container signin">
                <p>Already have an account? <a href="#">Sign in</a>.</p>
            </div>
            </form>

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
