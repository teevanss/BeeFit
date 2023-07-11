import { ArrowRightCircle } from 'react-bootstrap-icons';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import { useContext } from 'react';
import { MyContext } from '../MyContext';
import '../css/homepage.css';
import 'animate.css';
import BeeFlower from "../images/bee-flower.svg";
import BeeFlowerDark from "../images/bee-dark.svg";

export const Homepage = () => {

    const {activeLink, setActiveLink} = useContext(MyContext);
    const {theme, setTheme} = useContext(MyContext);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
      }

    //Display image based off current theme 
    let beeImage;
    if (theme == "light") {
        beeImage = <img className="bee" src={BeeFlower} alt="Bee holding flower"/>
    }
    else {
        beeImage = <img className="bee" src={BeeFlowerDark} alt="Bee holding flower"/>
    }
    return ( 

        <section className="home" id={theme == 'light' ? 'home' : 'home-dark'}>
        <Container>
            <Row className="align-items-center">

            {/* One full-width column, one 8/12 column, one half-width column */}
            <Col xs={14} md={8} xl={6}>
                <div className="animate__animated animate__fadeIn">
                    <h1>Welcome to B<a>ee</a>Fit!</h1>
                    <p>Buzz! Daily self care is finally fun - take care of your pet by taking care of yourself!</p>
                    <Link to ="/register"><button onClick={() => onUpdateActiveLink('register')}>Get started <ArrowRightCircle size={25} /></button></Link>
                </div>
            </Col>

            <Col xs={14} md={8} xl={6}>
                <div className="animate__animated animate__zoomIn">
                    {beeImage}
                </div>
            </Col>
            
            </Row>
        </Container>
        </section>
  )
}