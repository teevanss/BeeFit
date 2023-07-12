import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { MyContext } from '../MyContext';
import '../css/login.css';
import 'animate.css';
import BeeStick from "../images/bee-stick.svg";

export const Login = () => {

    const {theme, setTheme} = useContext(MyContext);

    return ( 

        <section className="login" id={theme === 'light' ? 'login' : 'login-dark'}>
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
                    <div className="container">
                        
                        <h1>Log<a>in</a></h1>
                        <h2>Bee-lieve in yourself!</h2>

                        <input type="text" placeholder="Enter Username" name="uname" required className="text"></input>
                        <input type="password" placeholder="Enter Password" name="psw" required className="text"></input>

                        <Link to="/forgotpassword"><p><a>Forgot password?</a></p></Link>

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