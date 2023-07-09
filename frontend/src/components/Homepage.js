import { ArrowRightCircle } from 'react-bootstrap-icons';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import '../css/homepage.css';
import 'animate.css';
import BeeFlower from "../images/bee-flower.svg";
import Daisy from "../images/daisy.png";
import Daisy2 from "../images/daisy2.png";
import Daisy3 from "../images/daisy3.png";

export const Homepage = () => {

    return ( 

        <section className="home" id="home">
        <Container>
            <Row className="align-items-center">

            {/* One full-width column, one 8/12 column, one half-width column */}
            <Col xs={14} md={8} xl={6}>

                <div className="animate__animated animate__fadeIn">
                    <h1>Welcome to B<a>ee</a>Fit!</h1>
                    <p>Buzz! Daily self care is finally fun - take care of your pet by taking care of yourself!</p>
                    <Link to ="/register"><button>Get started <ArrowRightCircle size={25} /></button></Link>
                </div>

            </Col>
            <Col xs={14} md={8} xl={6}>

                    <div className="animate__animated animate__zoomIn">
                    <img className="bee" src={BeeFlower} alt="Bee holding flower"/>
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