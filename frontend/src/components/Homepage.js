import { ArrowRightCircle } from 'react-bootstrap-icons';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import { useContext } from 'react';
import { MyContext } from '../MyContext';
import '../css/homepage.css';
import 'animate.css';
import BeeFlower from "../images/bee-flower.svg";
import Daisy from "../images/daisy.png";
import Daisy2 from "../images/daisy2.png";
import Daisy3 from "../images/daisy3.png";

export const Homepage = () => {

    const {activeLink, setActiveLink} = useContext(MyContext);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
      }

    return ( 

        <section className="home" id="home">
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
                    <img className="bee" src={BeeFlower} alt="Bee holding flower"/>
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