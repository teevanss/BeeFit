import { ArrowRightCircle } from 'react-bootstrap-icons';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import '../css/homepage.css';
import 'animate.css';
import BeeFlower from "../images/bee-flower.svg";
import BeeFlowerDark from "../images/bee-dark.svg";

export const Homepage = () => {

    const {theme, setTheme} = useContext(ThemeContext);

    // Display image based off current theme 
    let beeImage;
    if (theme === "light") {
        beeImage = <img className="bee" src={BeeFlower} alt="Bee holding flower"/>
    }
    else {
        beeImage = <img className="bee" src={BeeFlowerDark} alt="Bee holding flower"/>
    }

    return ( 

        <section className="home" id={theme === 'light' ? 'home' : 'home-dark'}>
        <Container>
            <Row className="align-items-center">

            <Col xs={0} md={8} xl={6}>
                <div className="animate__animated animate__fadeIn">
                    <h1>Welcome to B<b>ee</b>Fit!</h1>
                    <p>Buzz! Daily self care is finally fun - take care of your pet by taking care of yourself!</p>
                    <Link to ="/register"><button>Get started <ArrowRightCircle size={25} /></button></Link>
                </div>
            </Col>

            <Col xs={12} md={4} xl={6}>
                <div className="animate__animated animate__zoomIn">
                    {beeImage}
                </div>
            </Col>
            
            </Row>
        </Container>
        </section>
  )
}